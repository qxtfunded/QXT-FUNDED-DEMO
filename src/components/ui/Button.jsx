import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'

const variants = {
  primary:
    'bg-gradient-to-b from-gold-300 to-gold-500 text-ink-950 font-semibold shadow-gold hover:shadow-gold-lg hover:from-gold-200 hover:to-gold-400 active:scale-[0.98]',
  secondary:
    'bg-ink-800 text-paper-50 border border-ink-600 hover:border-gold-500/50 hover:bg-ink-700 active:scale-[0.98]',
  ghost:
    'bg-transparent text-paper-100 hover:bg-white/5 active:scale-[0.98]',
  outline:
    'bg-transparent border border-gold-500/40 text-gold-300 hover:bg-gold-500/10 hover:border-gold-500 active:scale-[0.98]',
}

const sizes = {
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-sm rounded-xl',
  lg: 'px-8 py-4 text-base rounded-xl',
}

const Button = forwardRef(
  ({ as, to, href, variant = 'primary', size = 'md', className, children, ...props }, ref) => {
    const classes = clsx(
      'inline-flex items-center justify-center gap-2 transition-all duration-200 whitespace-nowrap',
      variants[variant],
      sizes[size],
      className
    )

    if (to) {
      return (
        <Link to={to} className={classes} ref={ref} {...props}>
          {children}
        </Link>
      )
    }
    if (href) {
      return (
        <a href={href} className={classes} ref={ref} {...props}>
          {children}
        </a>
      )
    }
    return (
      <button className={classes} ref={ref} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
