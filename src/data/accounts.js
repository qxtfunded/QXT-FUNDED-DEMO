// Central pricing data. Swap this for a Firestore `accountPlans` collection
// read later — every component consuming this imports from here only.

export const instantPlans = [
  { size: 3000, price: 70, dailyLoss: 700, split: 92 },
  { size: 5000, price: 116, dailyLoss: 1167, split: 92 },
  { size: 8000, price: 186, dailyLoss: 1867, split: 92 },
  { size: 11000, price: 256, dailyLoss: 2567, split: 92 },
  { size: 15000, price: 349, dailyLoss: 3500, split: 92 },
  { size: 20000, price: 466, dailyLoss: 4667, split: 92, popular: true },
  { size: 25000, price: 582, dailyLoss: 5833, split: 92 },
  { size: 35000, price: 815, dailyLoss: 8167, split: 92 },
  { size: 50000, price: 1165, dailyLoss: 11667, split: 92 },
].map((p) => ({ ...p, type: 'instant', fundingLabel: 'Direct Funding' }))

export const challengePlans = [
  { size: 3000, price: 48, profitTarget: 1200, dailyLoss: 900, drawdown: 2000 },
  { size: 5000, price: 81, profitTarget: 2000, dailyLoss: 1500, drawdown: 3333 },
  { size: 8000, price: 129, profitTarget: 3200, dailyLoss: 2400, drawdown: 5333, popular: true },
  { size: 11000, price: 178, profitTarget: 4400, dailyLoss: 3300, drawdown: 7333 },
  { size: 25000, price: 311, profitTarget: 10000, dailyLoss: 7500, drawdown: 16667 },
  { size: 50000, price: 484, profitTarget: 20000, dailyLoss: 15000, drawdown: 33333 },
].map((p) => ({ ...p, type: 'challenge', fundingLabel: 'Evaluation Required', split: 92 }))

export const currency = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })
