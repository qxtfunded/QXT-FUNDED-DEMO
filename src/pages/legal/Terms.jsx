import LegalLayout, { LegalSection } from '../../components/layout/LegalLayout'

export default function Terms() {
  return (
    <LegalLayout title="Terms & Agreement" updated="August 1, 2026">
      <LegalSection title="1. Acceptance of Terms">
        <p>
          By purchasing an account or otherwise using QXT Funded's services, you agree to be
          bound by these Terms & Agreement. If you do not agree, please do not use the service.
        </p>
      </LegalSection>
      <LegalSection title="2. Nature of the Service">
        <p>
          QXT Funded offers simulated trading evaluations. Instant and Challenge accounts operate
          on demo trading environments provided through our broker partners. No client funds are
          placed into live markets during the evaluation phase. Traders who meet the applicable
          performance criteria become eligible for a funded account, at which point profit splits
          are paid from QXT Funded's own capital in accordance with the funded account agreement.
        </p>
      </LegalSection>
      <LegalSection title="3. Account Rules">
        <p>
          Each account size lists its own profit target, daily loss limit, and maximum drawdown.
          Breaching any stated limit results in the account being closed. Rules are fixed at the
          time of purchase and displayed on the account's pricing page.
        </p>
      </LegalSection>
      <LegalSection title="4. Payments and Fees">
        <p>
          Account fees are one-time charges due at checkout. Fees are non-refundable except as
          described in our Refund Policy.
        </p>
      </LegalSection>
      <LegalSection title="5. Prohibited Conduct">
        <p>
          Use of automated exploits, latency arbitrage, account sharing, or coordinated trading
          across multiple accounts to circumvent risk limits is prohibited and may result in
          account termination without refund.
        </p>
      </LegalSection>
      <LegalSection title="6. Termination">
        <p>
          QXT Funded may suspend or terminate any account found to be in violation of these
          Terms, the account rules, or applicable law.
        </p>
      </LegalSection>
      <LegalSection title="7. Limitation of Liability">
        <p>
          QXT Funded is not liable for indirect, incidental, or consequential damages arising
          from use of the service, to the maximum extent permitted by law.
        </p>
      </LegalSection>
      <LegalSection title="8. Changes to Terms">
        <p>
          We may update these Terms from time to time. Continued use of the service after changes
          take effect constitutes acceptance of the revised Terms.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
