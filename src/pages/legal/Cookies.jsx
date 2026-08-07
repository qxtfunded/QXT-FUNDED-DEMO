import LegalLayout, { LegalSection } from '../../components/layout/LegalLayout'

export default function Cookies() {
  return (
    <LegalLayout title="Cookies Policy" updated="August 1, 2026">
      <LegalSection title="1. What Are Cookies">
        <p>
          Cookies are small text files stored on your device that help websites remember
          information about your visit.
        </p>
      </LegalSection>
      <LegalSection title="2. How We Use Cookies">
        <p>
          We use essential cookies to keep you signed in and to remember your preferences (such
          as the Instant/Challenge tab you last viewed). We use analytics cookies to understand
          how the site is used so we can improve it.
        </p>
      </LegalSection>
      <LegalSection title="3. Managing Cookies">
        <p>
          Most browsers let you block or delete cookies through their settings. Blocking
          essential cookies may prevent you from staying signed in to your dashboard.
        </p>
      </LegalSection>
      <LegalSection title="4. Third-Party Cookies">
        <p>
          Some analytics or payment providers we use may set their own cookies when you interact
          with their embedded tools on our site.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
