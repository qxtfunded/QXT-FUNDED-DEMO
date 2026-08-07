import LegalLayout, { LegalSection } from '../../components/layout/LegalLayout'

export default function Risk() {
  return (
    <LegalLayout title="Risk Disclosure" updated="August 1, 2026">
      <LegalSection title="1. Nature of Evaluation Accounts">
        <p>
          Instant and Challenge accounts are simulated trading environments. The account sizes,
          balances, and price feeds shown during the evaluation phase are demo parameters used to
          measure trading performance against fixed rules. No client capital is placed into live
          markets during this phase.
        </p>
      </LegalSection>
      <LegalSection title="2. Nature of Funded Accounts">
        <p>
          Traders who meet the profit target, daily loss limit, and drawdown requirements of
          their account become eligible for a funded account. Profit splits on funded accounts
          are real payments made from QXT Funded's own capital, in accordance with your funded
          account agreement — they are not paid out of other traders' evaluation fees.
        </p>
      </LegalSection>
      <LegalSection title="3. General Trading Risk">
        <p>
          Trading financial instruments, including through the broker platforms made available to
          funded traders, carries risk. Past performance during an evaluation is not a guarantee
          of future results, and market conditions can change quickly.
        </p>
      </LegalSection>
      <LegalSection title="4. No Investment Advice">
        <p>
          Nothing on this site or provided by our support team constitutes financial, investment,
          or trading advice. Decisions you make while trading, on evaluation or funded accounts,
          are your own.
        </p>
      </LegalSection>
      <LegalSection title="5. Suitability">
        <p>
          Prop-firm evaluations are not suitable for everyone. You should only pay the account fee
          if you can afford the loss of that fee and understand that passing an evaluation is not
          guaranteed.
        </p>
      </LegalSection>
    </LegalLayout>
  )
}
