import { forwardRef, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import clsx from 'clsx'

export const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-paper-200">
    {children}
  </label>
)

export const Input = forwardRef(({ className, type = 'text', icon: Icon, ...props }, ref) => {
  const [show, setShow] = useState(false)
  const isPassword = type === 'password'
  return (
    <div className="relative">
      {Icon && (
        <Icon size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-paper-500" />
      )}
      <input
        ref={ref}
        type={isPassword ? (show ? 'text' : 'password') : type}
        className={clsx(
          'w-full rounded-lg border border-white/10 bg-ink-800 px-4 py-3 text-sm text-paper-50 placeholder:text-paper-500 transition-colors',
          'focus:border-gold-500/50 focus:outline-none focus:ring-1 focus:ring-gold-500/30',
          Icon && 'pl-10',
          isPassword && 'pr-10',
          className
        )}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-paper-500 hover:text-paper-200"
          tabIndex={-1}
        >
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      )}
    </div>
  )
})
Input.displayName = 'Input'

export const Select = forwardRef(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={clsx(
      'w-full appearance-none rounded-lg border border-white/10 bg-ink-800 px-4 py-3 text-sm text-paper-50 transition-colors',
      'focus:border-gold-500/50 focus:outline-none focus:ring-1 focus:ring-gold-500/30',
      className
    )}
    {...props}
  >
    {children}
  </select>
))
Select.displayName = 'Select'

export const Textarea = forwardRef(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={clsx(
      'w-full rounded-lg border border-white/10 bg-ink-800 px-4 py-3 text-sm text-paper-50 placeholder:text-paper-500 transition-colors',
      'focus:border-gold-500/50 focus:outline-none focus:ring-1 focus:ring-gold-500/30',
      className
    )}
    {...props}
  />
))
Textarea.displayName = 'Textarea'

export const Checkbox = ({ label, className, ...props }) => (
  <label className={clsx('flex cursor-pointer items-start gap-2.5 text-sm text-paper-300', className)}>
    <input
      type="checkbox"
      className="mt-0.5 h-4 w-4 shrink-0 rounded border-white/20 bg-ink-800 text-gold-500 focus:ring-gold-500/40"
      {...props}
    />
    <span>{label}</span>
  </label>
)
