import LegalLayout, { LegalSection } from '../../components/layout/LegalLayout'

export default function Refund() {
  return (
    <LegalLayout title="Refund Policy" updated="August 14, 2026">
      <LegalSection title="1. General Policy & Compliance Requirement">
        <p>
          Account evaluation fees for Instant and Challenge accounts are one-time service charges. Because access to the proprietary trading environment and broker provisioning is allocated immediately upon transaction submission, fees are <strong>strictly non-refundable</strong> once processed.
        </p>
        <p className="mt-2 text-paper-300">
          <strong>Non-Compliance Clause:</strong> We <strong>do not provide refunds</strong> if a user fails to adhere to our Privacy Agreement, Terms of Service, or Account Registration guidelines.
        </p>
      </LegalSection>

      <LegalSection title="2. Eligible Refund Cases">
        <p>
          A refund review may only be considered under the following limited conditions:
        </p>
        <ul className="mt-2 list-disc pl-5 space-y-1 text-paper-300">
          <li>The account credentials were never delivered due to an unresolved technical processing error on our server.</li>
          <li>You were inadvertently charged multiple times for the exact same order transaction.</li>
          <li>You submitted a formal cancellation request via support within 24 hours of payment before any trading login or market activity occurred on the evaluation account.</li>
        </ul>
      </LegalSection>

      <LegalSection title="3. Strictly Non-Refundable Situations">
        <p>
          Refunds are <strong>strictly denied</strong> under the following circumstances:
        </p>
        <ul className="mt-2 list-disc pl-5 space-y-2 text-paper-300">
          <li>
            <strong>Privacy Agreement & Email Policy Breaches:</strong> Use of prohibited, deceptive, fake, or brand-impersonating email addresses (e.g. emails containing <code>qxtfunded</code>, <code>fundedaccount</code>, or <code>quotexfunded</code>) or falsified identification.
          </li>
          <li>
            <strong>Trading Rule Violations:</strong> Accounts terminated or disqualified due to maximum drawdown breaches, daily loss limit violations, coordinated arbitrage, latency abuse, or sharing account credentials.
          </li>
          <li>
            <strong>Active Evaluation Accounts:</strong> Accounts where trading positions or demo market executions have already been placed.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="4. How to Request a Refund Review">
        <p>
          To request a review for an eligible processing discrepancy, open a Billing support ticket from your QXT dashboard within the applicable 24-hour window, citing your Order Number and transaction hash. Our compliance department reviews requests within 2 business days.
        </p>
      </LegalSection>

      <LegalSection title="5. Processing Time">
        <p>
          Approved discrepancy refunds are returned via the original payment method. Cryptocurrency settlements are completed within 3 to 5 business days.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
