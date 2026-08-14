import LegalLayout, { LegalSection } from '../../components/layout/LegalLayout'

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Agreement & Terms Policy" updated="August 14, 2026">
      <LegalSection title="1. Information We Collect">
        <p>
          We collect the information needed to create your account and deliver our trading evaluation
          service: your full legal name, authentic personal email address, country of residence,
          phone number, and payment transaction references required to process and verify your orders.
          We do not store private payment credentials or private blockchain keys on our systems.
        </p>
      </LegalSection>

      <LegalSection title="2. Mandatory Legal Email Address Requirement">
        <p>
          All users must register using an <strong>authentic, verifiable, personal, or legal business email address</strong> (for example, your genuine personal Gmail, Outlook, or Yahoo account).
        </p>
        <p className="mt-3">
          To maintain security, prevent unauthorized brand misrepresentation, and protect trader accounts, <strong>it is strictly prohibited to register or place orders using email addresses containing proprietary, deceptive, or impersonating terms</strong>, including but not limited to:
        </p>
        <ul className="mt-2 list-disc pl-5 space-y-1 text-paper-300">
          <li><code>qxtfunded</code> / <code>qxt-funded</code></li>
          <li><code>fundedaccount</code> / <code>funded-account</code></li>
          <li><code>quotexfunded</code> / <code>quotex-funded</code></li>
          <li>Any email prefix or username containing company names, support spoofing, or unauthorized brand references</li>
        </ul>
        <p className="mt-3 text-paper-300">
          Any account created or order submitted using an invalid, spoofed, or brand-impersonating email address will be <strong>automatically blocked or rejected</strong> without prior notice.
        </p>
      </LegalSection>

      <LegalSection title="3. Refund Policy & Privacy Agreement Compliance">
        <p>
          <strong>Strict Non-Refundable Policy on Agreement Non-Compliance:</strong> QXT Funded provides instant digital access to proprietary simulated trading evaluation accounts. Because resources, server infrastructure, and broker partner slots are provisioned immediately upon order placement:
        </p>
        <ul className="mt-2 list-disc pl-5 space-y-2 text-paper-300">
          <li>
            <strong>Zero Refunds on Agreement Violations:</strong> We <strong>do not provide refunds</strong> under any circumstance if a user fails to follow, breaches, or violates our Privacy Agreement, Terms of Service, or Broker Evaluation Rules.
          </li>
          <li>
            <strong>Invalid/Illegal Email Submissions:</strong> Orders placed with prohibited, disposable, or impersonating email addresses (such as <code>qxtfunded</code>, <code>fundedaccount</code>, or <code>quotexfunded</code>) are classified as intentional breaches and are strictly <strong>ineligible for any refund</strong>.
          </li>
          <li>
            <strong>Trading Rule Breaches:</strong> Failure to respect maximum drawdown, daily loss limits, prohibited automated exploits, or credential sharing results in immediate account disqualification with no refund.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="4. How We Use Your Information">
        <p>
          Your information is used strictly to verify trader identity, deliver evaluation credentials, process profit payouts, respond to support requests, and send important service-related updates. We do not sell, rent, or trade your personal data to third parties for marketing purposes.
        </p>
      </LegalSection>

      <LegalSection title="5. Data Storage and Security">
        <p>
          Account records, order history, and support communications are secured using industry-standard encrypted cloud infrastructure with SSL/TLS encryption in transit and at rest. Access to sensitive records is restricted strictly to authorized compliance and administrative personnel.
        </p>
      </LegalSection>

      <LegalSection title="6. Payment & Blockchain Information">
        <p>
          Where payments are made via cryptocurrency (USDT TRC-20, BEP-20, Polygon, etc.), transactions are recorded on public decentralized ledgers according to standard blockchain protocol. QXT Funded does not publish your personal identity or private account details on public ledgers.
        </p>
      </LegalSection>

      <LegalSection title="7. Cookies & Session Management">
        <p>
          We use functional cookies and secure local session tokens to keep your session authenticated and safeguard your dashboard navigation. You may manage browser cookie settings at any time.
        </p>
      </LegalSection>

      <LegalSection title="8. User Rights & Account Compliance">
        <p>
          Traders may request review of their stored profile details or request account closure, subject to statutory retention requirements for financial auditing and anti-fraud compliance.
        </p>
      </LegalSection>

      <LegalSection title="9. Changes to This Policy">
        <p>
          QXT Funded reserves the right to amend this Privacy Agreement and Terms Policy at any time to reflect operational, regulatory, or security updates. Continued use of the platform constitutes full acceptance of the revised policies.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
