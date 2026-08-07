import LegalLayout, { LegalSection } from '../../components/layout/LegalLayout'

export default function Privacy() {
  return (
    <LegalLayout title="Privacy Agreement" updated="August 1, 2026">
      <LegalSection title="1. Information We Collect">
        <p>
          We collect the information needed to create your account and deliver our service:
          your name, email address, country, phone number, and the payment details required to
          process your order. We do not collect government identification numbers unless
          required for a specific payout method, and we never store full payment card numbers on
          our own systems.
        </p>
      </LegalSection>
      <LegalSection title="2. How We Use Your Information">
        <p>
          Your information is used to create and manage your account, process orders and
          payouts, respond to support requests, and send service-related communications. We do
          not sell your personal information to third parties.
        </p>
      </LegalSection>
      <LegalSection title="3. Data Storage and Security">
        <p>
          Account data, order history, and support tickets are stored using industry-standard
          cloud infrastructure with encryption in transit and at rest. Access to your data is
          restricted to authorized personnel who need it to operate the service.
        </p>
      </LegalSection>
      <LegalSection title="4. Payment Information">
        <p>
          Where payments are made via cryptocurrency, transactions are recorded on the relevant
          public blockchain as part of how that network operates. QXT Funded does not publish
          your name or account details alongside any on-chain transaction.
        </p>
      </LegalSection>
      <LegalSection title="5. Cookies">
        <p>
          We use cookies to keep you signed in and to understand how the site is used. See our
          Cookies policy for details and how to manage your preferences.
        </p>
      </LegalSection>
      <LegalSection title="6. Your Rights">
        <p>
          You may request a copy of the personal data we hold about you, ask us to correct
          inaccurate data, or request deletion of your account, subject to any records we are
          required to keep for legal or accounting purposes. Contact support to make a request.
        </p>
      </LegalSection>
      <LegalSection title="7. Changes to This Policy">
        <p>
          We may update this Privacy Agreement from time to time. Material changes will be
          communicated via email or an in-app notice.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
