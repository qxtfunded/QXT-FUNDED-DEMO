import clsx from 'clsx'

export function Card({ className, children, hover = true, ...props }) {
  return (
    <div
      className={clsx(
        'relative rounded-xl2 border border-white/[0.06] bg-ink-800/70 shadow-card',
        hover && 'transition-all duration-300 hover:border-gold-500/30 hover:-translate-y-1',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function Badge({ tone = 'neutral', children, className }) {
  const tones = {
    neutral: 'bg-white/5 text-paper-300 border-white/10',
    gold: 'bg-gold-500/10 text-gold-300 border-gold-500/30',
    mint: 'bg-mint-500/10 text-mint-400 border-mint-500/30',
    warning: 'bg-signal-warning/10 text-signal-warning border-signal-warning/30',
    error: 'bg-signal-error/10 text-signal-error border-signal-error/30',
  }
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium',
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  )
}

export function Eyebrow({ children, className }) {
  return (
    <div
      className={clsx(
        'font-mono text-xs uppercase tracking-[0.2em] text-gold-400/80 mb-3',
        className
      )}
    >
      {children}
    </div>
  )
}

export function Section({ id, className, children }) {
  return (
    <section id={id} className={clsx('relative py-20 md:py-28', className)}>
      <div className="mx-auto max-w-7xl px-6">{children}</div>
    </section>
  )
}
