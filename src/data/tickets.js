export const tickets = [
  {
    id: 'TCK-2291',
    subject: 'Payout delayed for QXT-10482',
    category: 'Billing',
    priority: 'High',
    status: 'answered',
    updated: '2026-08-05',
    messages: [
      { from: 'user', text: 'My payout request from 3 days ago still shows pending. Can someone check?', time: 'Aug 2, 10:14 AM' },
      { from: 'support', text: 'Thanks for flagging this — we\u2019re looking into the delay with our payment processor and will update you within 24 hours.', time: 'Aug 2, 2:47 PM' },
      { from: 'support', text: 'Your payout has been released. You should see it within the hour. Apologies for the wait.', time: 'Aug 5, 9:02 AM' },
    ],
  },
  {
    id: 'TCK-2280',
    subject: 'Question about drawdown reset time',
    category: 'Challenge',
    priority: 'Medium',
    status: 'closed',
    updated: '2026-07-29',
    messages: [
      { from: 'user', text: 'Does the max drawdown reset daily or is it fixed for the whole evaluation?', time: 'Jul 28, 6:20 PM' },
      { from: 'support', text: 'Max drawdown is fixed for the full evaluation — only the daily loss limit resets each day.', time: 'Jul 29, 8:15 AM' },
    ],
  },
  {
    id: 'TCK-2265',
    subject: 'Cannot log in to Quotex broker account',
    category: 'Technical',
    priority: 'High',
    status: 'open',
    updated: '2026-07-20',
    messages: [
      { from: 'user', text: 'Getting an invalid credentials error when I try to log into the broker platform.', time: 'Jul 20, 11:05 AM' },
    ],
  },
]

export const ticketCategories = ['Technical', 'Billing', 'Account', 'Challenge', 'General']
export const ticketPriorities = ['Low', 'Medium', 'High']
export const ticketStatusMeta = {
  open: { label: 'Open', tone: 'gold' },
  waiting_reply: { label: 'Waiting Reply', tone: 'warning' },
  answered: { label: 'Answered', tone: 'mint' },
  closed: { label: 'Closed', tone: 'neutral' },
}
