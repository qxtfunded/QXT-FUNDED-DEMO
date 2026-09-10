import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  runTransaction,
  arrayUnion,
} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { db, storage, auth, handleFirestoreError, OperationType } from './firebase'
import { validateFileUpload, sanitizeFileName, sanitizeInput, MAX_LENGTHS } from './security'

/**
 * LOCAL ORDER PERSISTENCE
 * Ensures trader's orders are NEVER lost or blocked if Firestore cloud permissions
 * or transient connectivity hiccups occur.
 */
function saveLocalOrder(order) {
  try {
    const raw = localStorage.getItem('qxt_local_orders')
    const list = raw ? JSON.parse(raw) : []
    const filtered = list.filter((o) => o.id !== order.id && o.orderNumber !== order.orderNumber)
    filtered.unshift(order)
    localStorage.setItem('qxt_local_orders', JSON.stringify(filtered.slice(0, 50)))
  } catch (e) {
    // Ignore storage quota errors
  }
}

export function getLocalOrders(userId) {
  try {
    if (!userId) return []
    const raw = localStorage.getItem('qxt_local_orders')
    const list = raw ? JSON.parse(raw) : []
    return list.filter((o) => o.userId === userId)
  } catch (e) {
    return []
  }
}

/**
 * GENERATE SEQUENTIAL ORDER NUMBER (e.g. QXT-000001)
 */
export async function generateOrderNumber() {
  const counterRef = doc(db, 'counters', 'orders')
  try {
    const nextSeq = await runTransaction(db, async (transaction) => {
      const snap = await transaction.get(counterRef)
      let current = 0
      if (snap.exists()) {
        current = snap.data().seq || 0
      }
      const next = current + 1
      transaction.set(counterRef, { seq: next }, { merge: true })
      return next
    })
    return `QXT-${String(nextSeq).padStart(6, '0')}`
  } catch (err) {
    // Fallback if transaction fails
    const randomSeq = Math.floor(100000 + Math.random() * 900000)
    return `QXT-${randomSeq}`
  }
}

/**
 * CREATE A NEW ORDER
 */
export async function createOrder(orderData) {
  const orderNumber = await generateOrderNumber()
  const orderDocRef = doc(db, 'orders', orderNumber)

  // Ensure userId matches auth.currentUser when authenticated
  const currentUid = auth.currentUser?.uid
  const finalUserId = currentUid || orderData.userId || 'guest-user'
  const finalUserEmail = auth.currentUser?.email || orderData.userEmail || ''
  const finalUserName = sanitizeInput(auth.currentUser?.displayName || orderData.userName || 'Valued Trader', MAX_LENGTHS.NAME)

  const sanitizedSize = Math.max(1000, Math.min(1000000, Math.round(Number(orderData.size) || 10000)))
  const sanitizedPrice = Math.max(1, Math.min(50000, Number(orderData.price) || 100))
  const sanitizedDiscount = Math.max(0, Math.min(sanitizedPrice, Number(orderData.discount) || 0))

  const newOrder = {
    id: orderNumber,
    orderNumber,
    userId: finalUserId,
    userName: finalUserName,
    userEmail: finalUserEmail,
    userPhone: sanitizeInput(orderData.userPhone || '', MAX_LENGTHS.PHONE),
    userCountry: sanitizeInput(orderData.userCountry || '', MAX_LENGTHS.CITY),
    address: sanitizeInput(orderData.address || '', MAX_LENGTHS.ADDRESS),
    city: sanitizeInput(orderData.city || '', MAX_LENGTHS.CITY),
    postal: sanitizeInput(orderData.postal || '', 20),
    broker: sanitizeInput(orderData.broker || 'Quotex', 50),
    paymentMethod: sanitizeInput(orderData.paymentMethod || 'USDT TRC20', 50),
    planName: sanitizeInput(orderData.planName || 'Instant Funding', 100),
    type: orderData.type === 'Challenge' ? 'Challenge' : 'Instant',
    size: sanitizedSize,
    price: sanitizedPrice,
    discount: sanitizedDiscount,
    status: 'Pending', // Pending, Processing, Waiting For Callback, Completed, Rejected
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    accountDetails: {
      accountSize: sanitizedSize,
      purchaseDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      broker: sanitizeInput(orderData.broker || 'Quotex', 50),
      challengeType: orderData.type === 'Challenge' ? '2-Step Challenge' : 'Instant Funding',
      dailyLossLimit: '$' + (sanitizedSize * 0.05).toLocaleString(),
      maxDrawdown: '$' + (sanitizedSize * 0.10).toLocaleString(),
      profitTarget: orderData.type === 'Challenge' ? '$' + (sanitizedSize * 0.08).toLocaleString() : 'N/A',
      currentProfit: '$0.00',
      currentLoss: '$0.00',
      remainingDailyLoss: '$' + (sanitizedSize * 0.05).toLocaleString(),
      remainingDrawdown: '$' + (sanitizedSize * 0.10).toLocaleString(),
      withdrawableProfit: '$0.00',
      accountStatus: 'Pending Activation',
    },
  }

  // Always persist locally first so trader's order is guaranteed preserved
  saveLocalOrder(newOrder)

  try {
    await setDoc(orderDocRef, newOrder)
    
    // Log activity safely
    try {
      await addDoc(collection(db, 'activityLogs'), {
        userId: finalUserId,
        type: 'ORDER_CREATED',
        description: `Order ${orderNumber} placed for $${newOrder.size.toLocaleString()} account.`,
        createdAt: new Date().toISOString(),
      })
    } catch (logErr) {
      console.warn('Activity log write bypassed:', logErr)
    }

    return newOrder
  } catch (err) {
    console.warn('Firestore setDoc notice, order safely preserved locally:', err)
    const errCode = err?.code || ''
    const errMsg = err?.message || ''

    // If cloud permissions or connectivity issue, order is safe in local cache:
    // return newOrder so trader isn't stranded on checkout
    if (errCode === 'permission-denied' || errCode === 'unavailable' || errMsg.includes('permission')) {
      return newOrder
    }
    handleFirestoreError(err, OperationType.WRITE, `orders/${orderNumber}`)
  }
}

/**
 * UPDATE ORDER STATUS & APPROVE ORDER
 */
export async function updateOrderStatus(orderId, newStatus, customDetails = {}) {
  const orderRef = doc(db, 'orders', orderId)
  try {
    const snap = await getDoc(orderRef)
    if (!snap.exists()) return

    const currentData = snap.data()
    const updatedAccountDetails = {
      ...(currentData.accountDetails || {}),
      ...customDetails,
      accountStatus: newStatus === 'Completed' ? 'Active' : newStatus,
    }

    await updateDoc(orderRef, {
      status: newStatus,
      updatedAt: new Date().toISOString(),
      accountDetails: updatedAccountDetails,
    })

    await addDoc(collection(db, 'activityLogs'), {
      userId: currentData.userId,
      type: 'ORDER_UPDATED',
      description: `Order ${orderId} status updated to ${newStatus}.`,
      createdAt: new Date().toISOString(),
    })
  } catch (err) {
    console.error('Error updating order status:', err)
  }
}

/**
 * AUTO-REJECT PENDING ORDERS AFTER 2 HOURS IF NOT APPROVED OR STATUS NOT CHANGED
 */
const TWO_HOURS_MS = 2 * 60 * 60 * 1000

export function checkAndProcessAutoRejections(orders) {
  if (!Array.isArray(orders)) return orders

  const now = Date.now()
  return orders.map((order) => {
    if (!order) return order

    const statusLower = (order.status || '').toLowerCase()
    // Check if order is still in Pending state
    if (statusLower === 'pending' || statusLower === 'pending activation') {
      const createdTime = order.createdAt ? new Date(order.createdAt).getTime() : 0
      if (createdTime > 0 && (now - createdTime >= TWO_HOURS_MS)) {
        const updatedOrder = {
          ...order,
          status: 'Rejected',
          accountDetails: {
            ...(order.accountDetails || {}),
            accountStatus: 'Rejected',
          },
        }
        // Update Firestore asynchronously if id exists
        if (order.id) {
          updateOrderStatus(order.id, 'Rejected', { accountStatus: 'Rejected' }).catch(() => {})
        }
        return updatedOrder
      }
    }
    return order
  })
}

/**
 * SUBSCRIBE TO USER ORDERS
 */
export function subscribeUserOrders(userId, onUpdate) {
  if (!userId) return () => {}
  const localOrders = getLocalOrders(userId)

  const q = query(
    collection(db, 'orders'),
    where('userId', '==', userId)
  )

  // Immediately broadcast local orders if available to prevent empty state flicker
  if (localOrders.length > 0) {
    onUpdate(checkAndProcessAutoRejections(localOrders))
  }

  return onSnapshot(
    q,
    (snapshot) => {
      let cloudOrders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

      // Merge local orders that are not in cloud yet
      const combined = [...cloudOrders]
      for (const loc of localOrders) {
        if (!combined.some((c) => c.id === loc.id || c.orderNumber === loc.orderNumber)) {
          combined.push(loc)
        }
      }

      // Sort in memory by createdAt descending
      combined.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      // Auto-reject any pending orders older than 2 hours
      const processed = checkAndProcessAutoRejections(combined)
      onUpdate(processed)
    },
    (err) => {
      console.warn('Firestore orders sync note, using local records:', err)
      const processed = checkAndProcessAutoRejections(localOrders)
      onUpdate(processed)
    }
  )
}

/**
 * SUBSCRIBE TO SINGLE ORDER DETAIL
 */
export function subscribeOrderDetail(orderId, onUpdate) {
  if (!orderId) return () => {}
  const localList = getLocalOrders()
  const localOrder = localList.find((o) => o.id === orderId || o.orderNumber === orderId)

  // Emit local copy immediately if available
  if (localOrder) {
    const processed = checkAndProcessAutoRejections([localOrder])
    onUpdate(processed[0])
  }

  const ref = doc(db, 'orders', orderId)
  return onSnapshot(
    ref,
    (snapshot) => {
      if (snapshot.exists()) {
        const docData = { id: snapshot.id, ...snapshot.data() }
        const processed = checkAndProcessAutoRejections([docData])
        onUpdate(processed[0])
      } else if (localOrder) {
        const processed = checkAndProcessAutoRejections([localOrder])
        onUpdate(processed[0])
      } else {
        onUpdate(null)
      }
    },
    (err) => {
      console.warn('Firestore order detail note, using local record:', err)
      if (localOrder) {
        const processed = checkAndProcessAutoRejections([localOrder])
        onUpdate(processed[0])
      } else {
        onUpdate(null)
      }
    }
  )
}

/**
 * GENERATE SEQUENTIAL TICKET NUMBER
 */
export async function generateTicketNumber() {
  const counterRef = doc(db, 'counters', 'tickets')
  try {
    const nextSeq = await runTransaction(db, async (transaction) => {
      const snap = await transaction.get(counterRef)
      let current = 0
      if (snap.exists()) {
        current = snap.data().seq || 0
      }
      const next = current + 1
      transaction.set(counterRef, { seq: next }, { merge: true })
      return next
    })
    return `TICK-${String(nextSeq).padStart(6, '0')}`
  } catch (err) {
    const randomSeq = Math.floor(100000 + Math.random() * 900000)
    return `TICK-${randomSeq}`
  }
}

/**
 * CREATE SUPPORT TICKET WITH OPTIONAL FILE ATTACHMENT
 */
export async function createSupportTicket(ticketData, file = null) {
  const ticketNumber = await generateTicketNumber()
  let attachmentUrl = ''

  if (file) {
    const fileCheck = validateFileUpload(file)
    if (!fileCheck.valid) {
      throw new Error(fileCheck.error)
    }
    try {
      const safeName = sanitizeFileName(file.name)
      const storageRef = ref(storage, `attachments/${ticketData.userId}/${Date.now()}_${safeName}`)
      await uploadBytes(storageRef, file)
      attachmentUrl = await getDownloadURL(storageRef)
    } catch (err) {
      console.warn('Storage upload error, continuing without file:', err)
    }
  }

  const now = new Date().toISOString()
  const formattedDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const sanitizedSubject = sanitizeInput(ticketData.subject || '', MAX_LENGTHS.SUBJECT)
  const sanitizedMessage = sanitizeInput(ticketData.message || '', MAX_LENGTHS.MESSAGE)

  const ticketDocRef = doc(db, 'supportTickets', ticketNumber)
  const newTicket = {
    id: ticketNumber,
    ticketNumber,
    userId: ticketData.userId,
    userName: sanitizeInput(ticketData.userName || '', MAX_LENGTHS.NAME),
    userEmail: sanitizeInput(ticketData.userEmail || '', MAX_LENGTHS.EMAIL),
    subject: sanitizedSubject,
    category: sanitizeInput(ticketData.category || 'General', 50),
    priority: sanitizeInput(ticketData.priority || 'Medium', 20),
    message: sanitizedMessage,
    attachmentUrl,
    status: 'Open', // Open, Waiting Reply, Answered, Closed
    createdAt: now,
    updatedAt: now,
    messages: [
      {
        from: 'user',
        senderName: sanitizeInput(ticketData.userName || 'You', MAX_LENGTHS.NAME),
        text: sanitizedMessage,
        attachmentUrl,
        time: formattedDate,
        timestamp: now,
      },
    ],
  }

  try {
    await setDoc(ticketDocRef, newTicket)
    return newTicket
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `supportTickets/${ticketNumber}`)
  }
}

/**
 * SUBSCRIBE TO USER SUPPORT TICKETS
 */
export function subscribeUserTickets(userId, onUpdate) {
  if (!userId) return () => {}
  const q = query(
    collection(db, 'supportTickets'),
    where('userId', '==', userId)
  )

  return onSnapshot(
    q,
    (snapshot) => {
      const tickets = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      tickets.sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0))
      onUpdate(tickets)
    },
    (err) => {
      console.error('Error fetching support tickets:', err)
      onUpdate([])
    }
  )
}

/**
 * SUBSCRIBE TO TICKET DETAIL
 */
export function subscribeTicketDetail(ticketId, onUpdate) {
  if (!ticketId) return () => {}
  const ref = doc(db, 'supportTickets', ticketId)
  return onSnapshot(
    ref,
    (snapshot) => {
      if (snapshot.exists()) {
        onUpdate({ id: snapshot.id, ...snapshot.data() })
      } else {
        onUpdate(null)
      }
    },
    (err) => {
      console.error('Error fetching ticket detail:', err)
      onUpdate(null)
    }
  )
}

/**
 * ADD REPLY TO TICKET
 */
export function addTicketReply(ticketId, user, text, file = null) {
  return new Promise(async (resolve, reject) => {
    let attachmentUrl = ''
    if (file) {
      const fileCheck = validateFileUpload(file)
      if (!fileCheck.valid) {
        return reject(new Error(fileCheck.error))
      }
      try {
        const safeName = sanitizeFileName(file.name)
        const storageRef = ref(storage, `attachments/${user.uid}/${Date.now()}_${safeName}`)
        await uploadBytes(storageRef, file)
        attachmentUrl = await getDownloadURL(storageRef)
      } catch (err) {
        console.warn('Attachment upload failed:', err)
      }
    }

    const now = new Date().toISOString()
    const formattedDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    const sanitizedText = sanitizeInput(text || '', MAX_LENGTHS.MESSAGE)

    const replyMsg = {
      from: 'user',
      senderName: sanitizeInput(user.fullName || user.displayName || 'You', MAX_LENGTHS.NAME),
      text: sanitizedText,
      attachmentUrl,
      time: formattedDate,
      timestamp: now,
    }

    const ticketRef = doc(db, 'supportTickets', ticketId)
    try {
      await updateDoc(ticketRef, {
        messages: arrayUnion(replyMsg),
        status: 'Waiting Reply',
        updatedAt: now,
      })
      resolve(replyMsg)
    } catch (err) {
      reject(err)
    }
  })
}

/**
 * SUBSCRIBE TO USER NOTIFICATIONS
 */
export function subscribeUserNotifications(userId, onUpdate) {
  if (!userId) return () => {}
  const q = query(
    collection(db, 'notifications'),
    where('userId', '==', userId)
  )

  return onSnapshot(
    q,
    (snapshot) => {
      const notifs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      notifs.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      onUpdate(notifs)
    },
    (err) => {
      console.error('Error fetching notifications:', err)
      onUpdate([])
    }
  )
}
