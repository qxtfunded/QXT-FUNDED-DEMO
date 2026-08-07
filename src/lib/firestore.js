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
import { db, storage, handleFirestoreError, OperationType } from './firebase'

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

  const newOrder = {
    id: orderNumber,
    orderNumber,
    userId: orderData.userId,
    userName: orderData.userName || '',
    userEmail: orderData.userEmail || '',
    userPhone: orderData.userPhone || '',
    userCountry: orderData.userCountry || '',
    address: orderData.address || '',
    city: orderData.city || '',
    postal: orderData.postal || '',
    broker: orderData.broker || 'MetaTrader 5',
    paymentMethod: orderData.paymentMethod || 'USDT (TRC-20)',
    planName: orderData.planName || 'Instant Funding',
    type: orderData.type || 'Instant', // Instant or Challenge
    size: Number(orderData.size) || 10000,
    price: Number(orderData.price) || 100,
    discount: Number(orderData.discount) || 0,
    status: 'Pending', // Pending, Processing, Waiting For Callback, Completed, Rejected
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    accountDetails: {
      accountSize: Number(orderData.size) || 10000,
      purchaseDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      broker: orderData.broker || 'MetaTrader 5',
      challengeType: orderData.type === 'Challenge' ? '2-Step Challenge' : 'Instant Funding',
      dailyLossLimit: '$' + ((Number(orderData.size) || 10000) * 0.05).toLocaleString(),
      maxDrawdown: '$' + ((Number(orderData.size) || 10000) * 0.10).toLocaleString(),
      profitTarget: orderData.type === 'Challenge' ? '$' + ((Number(orderData.size) || 10000) * 0.08).toLocaleString() : 'N/A',
      currentProfit: '$0.00',
      currentLoss: '$0.00',
      remainingDailyLoss: '$' + ((Number(orderData.size) || 10000) * 0.05).toLocaleString(),
      remainingDrawdown: '$' + ((Number(orderData.size) || 10000) * 0.10).toLocaleString(),
      withdrawableProfit: '$0.00',
      accountStatus: 'Pending Activation',
    },
  }

  try {
    await setDoc(orderDocRef, newOrder)
    
    // Log activity
    await addDoc(collection(db, 'activityLogs'), {
      userId: orderData.userId,
      type: 'ORDER_CREATED',
      description: `Order ${orderNumber} placed for $${newOrder.size.toLocaleString()} account.`,
      createdAt: new Date().toISOString(),
    })

    return newOrder
  } catch (err) {
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
 * SUBSCRIBE TO USER ORDERS
 */
export function subscribeUserOrders(userId, onUpdate) {
  if (!userId) return () => {}
  const q = query(
    collection(db, 'orders'),
    where('userId', '==', userId)
  )

  return onSnapshot(
    q,
    (snapshot) => {
      const orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      // Sort in memory by createdAt descending
      orders.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
      onUpdate(orders)
    },
    (err) => {
      console.error('Error fetching orders:', err)
      onUpdate([])
    }
  )
}

/**
 * SUBSCRIBE TO SINGLE ORDER DETAIL
 */
export function subscribeOrderDetail(orderId, onUpdate) {
  if (!orderId) return () => {}
  const ref = doc(db, 'orders', orderId)
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
      console.error('Error fetching order detail:', err)
      onUpdate(null)
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
    try {
      const storageRef = ref(storage, `attachments/${ticketData.userId}/${Date.now()}_${file.name}`)
      await uploadBytes(storageRef, file)
      attachmentUrl = await getDownloadURL(storageRef)
    } catch (err) {
      console.warn('Storage upload error, continuing without file:', err)
    }
  }

  const now = new Date().toISOString()
  const formattedDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

  const ticketDocRef = doc(db, 'supportTickets', ticketNumber)
  const newTicket = {
    id: ticketNumber,
    ticketNumber,
    userId: ticketData.userId,
    userName: ticketData.userName || '',
    userEmail: ticketData.userEmail || '',
    subject: ticketData.subject || '',
    category: ticketData.category || 'General',
    priority: ticketData.priority || 'Medium',
    message: ticketData.message || '',
    attachmentUrl,
    status: 'Open', // Open, Waiting Reply, Answered, Closed
    createdAt: now,
    updatedAt: now,
    messages: [
      {
        from: 'user',
        senderName: ticketData.userName || 'You',
        text: ticketData.message,
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
      try {
        const storageRef = ref(storage, `attachments/${user.uid}/${Date.now()}_${file.name}`)
        await uploadBytes(storageRef, file)
        attachmentUrl = await getDownloadURL(storageRef)
      } catch (err) {
        console.warn('Attachment upload failed:', err)
      }
    }

    const now = new Date().toISOString()
    const formattedDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })

    const replyMsg = {
      from: 'user',
      senderName: user.fullName || user.displayName || 'You',
      text,
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
