# QXT Funded — Frontend

Production-ready React + Vite + Tailwind frontend for a prop-trading funded
account platform. No backend is wired in — every data-touching piece is
isolated so Firebase (Auth + Firestore) can be dropped in later with minimal
changes.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Project shape

```
src/
  components/
    ui/          Button, Card, Badge, Form inputs, Skeleton — the design system
    layout/      Navbar, Footer, SiteLayout, DashboardLayout, AuthShell, LegalLayout
    sections/    AccountCard, EquityCurve, StatusBadge — composed pieces
  pages/         One file per route
    auth/        Login, Signup, ForgotPassword, VerifyEmail
    dashboard/   Overview, Orders, OrderDetail, Billing, Support*, Profile, Security
    legal/       Terms, Privacy, Refund, Risk, Cookies
  data/          accounts.js, content.js, orders.js, tickets.js — all mock data
  lib/
    AuthContext.jsx   Firebase-shaped auth interface (see below)
```

## Wiring up Firebase

1. `npm install firebase`
2. Create a Firebase project, enable **Authentication** (Email/Password, and
   Google if you want the button in `Login.jsx` to be real) and **Firestore**.
3. Copy `.env.example` to `.env.local` and fill in your config values.
4. In `src/lib/AuthContext.jsx`, initialize the app and swap the four `TODO(firebase)`
   marked functions (`signIn`, `signUp`, `signOut`, `resetPassword`) for the
   real `firebase/auth` calls. Every component calls `useAuth()`, so nothing
   else needs to change.
5. For data (`src/data/accounts.js`, `orders.js`, `tickets.js`), replace the
   static arrays with Firestore reads (`getDocs`/`onSnapshot`) scoped to the
   signed-in user's `uid`. Keep the same shape (field names) the components
   already expect and the UI keeps working unmodified.
6. Add a route guard (e.g. a `<ProtectedRoute>` wrapper around the
   `/dashboard/*` routes in `App.jsx`) once real auth state exists, to
   redirect signed-out users to `/login`.

## Design system

- **Palette:** near-black ink background, muted luxury gold primary, soft
  mint accent — defined in `tailwind.config.js` under `colors`.
- **Type:** Space Grotesk (display), Inter (body), JetBrains Mono (all
  numeric/data values — prices, stats, order IDs) for a trading-terminal feel.
- **Signature motif:** an animated equity-curve SVG (`EquityCurve.jsx`) used
  on the hero and auth screens.

## Notes on copy

Account fees fund **simulated evaluation environments**; profit splits on
funded accounts are real payouts from firm capital. The marketing and legal
copy throughout the site (hero, footer disclaimer, Risk Disclosure, Terms)
is written to reflect that accurately — keep it consistent if you edit it.
