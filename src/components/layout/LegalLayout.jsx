import { Section } from '../ui/Primitives'

export default function LegalLayout({ title, updated, children }) {
  return (
    <div className="pt-24">
      <Section className="pb-24">
        <div className="mx-auto max-w-3xl">
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">{title}</h1>
          <p className="mt-2 text-sm text-paper-500">Last updated: {updated}</p>
          <div className="prose-legal mt-10 space-y-6 text-sm leading-relaxed text-paper-300">
            {children}
          </div>
        </div>
      </Section>
    </div>
  )
}

export function LegalSection({ title, children }) {
  return (
    <div>
      <h2 className="font-display text-lg font-semibold text-paper-100">{title}</h2>
      <div className="mt-2 space-y-3">{children}</div>
    </div>
  )
}
