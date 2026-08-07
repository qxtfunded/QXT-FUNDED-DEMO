import LegalLayout, { LegalSection } from '../../components/layout/LegalLayout'

export default function Refund() {
  return (
    <LegalLayout title="Refund Policy" updated="August 1, 2026">
      <LegalSection title="1. General Policy">
        <p>
          Account fees for Instant and Challenge accounts are one-time charges. Because access to
          the trading environment is granted immediately upon payment confirmation, fees are
          generally non-refundable once an account has been issued.
        </p>
      </LegalSection>
      <LegalSection title="2. Eligible Refund Cases">
        <p>
          A refund may be issued if: (a) the account was never delivered due to a processing
          error on our end, (b) you were charged more than once for the same order, or (c) you
          cancel within 24 hours of purchase and have not yet logged into the issued account.
        </p>
      </LegalSection>
      <LegalSection title="3. How to Request a Refund">
        <p>
          Open a Billing support ticket from your dashboard within the applicable window,
          including your order number. Our team reviews each request individually and responds
          within 2 business days.
        </p>
      </LegalSection>
      <LegalSection title="4. Non-Refundable Situations">
        <p>
          Fees are not refunded where an account was closed due to a rule violation (breach of
          daily loss limit, drawdown, or prohibited trading activity), or where the account has
          already been actively used.
        </p>
      </LegalSection>
      <LegalSection title="5. Processing Time">
        <p>
          Approved refunds are returned via the original payment method. Cryptocurrency refunds
          are typically processed within 3-5 business days; card refunds may take up to 10
          business days to appear depending on your provider.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
