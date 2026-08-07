// Placeholder order data shaped like a Firestore `orders` collection document.
// Swap for a live query (where userId == uid, orderBy createdAt desc) later.

export const orders = [
  {
    id: 'QXT-10482',
    date: '2026-08-01',
    size: 20000,
    type: 'Challenge',
    broker: 'Pocket Option',
    price: 433,
    status: 'completed',
  },
  {
    id: 'QXT-10471',
    date: '2026-07-24',
    size: 8000,
    type: 'Instant',
    broker: 'Quotex',
    price: 173,
    status: 'processing',
  },
  {
    id: 'QXT-10459',
    date: '2026-07-15',
    size: 11000,
    type: 'Instant',
    broker: 'Tradovate',
    price: 238,
    status: 'waiting_callback',
  },
  {
    id: 'QXT-10440',
    date: '2026-07-02',
    size: 5000,
    type: 'Challenge',
    broker: 'Binomo',
    price: 75,
    status: 'rejected',
  },
  {
    id: 'QXT-10412',
    date: '2026-06-20',
    size: 3000,
    type: 'Instant',
    broker: 'Olymp Trade',
    price: 65,
    status: 'pending',
  },
]

export const statusMeta = {
  pending: { label: 'Pending', tone: 'neutral' },
  processing: { label: 'Processing', tone: 'gold' },
  waiting_callback: { label: 'Waiting For Callback', tone: 'warning' },
  rejected: { label: 'Rejected', tone: 'error' },
  completed: { label: 'Completed', tone: 'mint' },
}
