import clsx from 'clsx'

export function Skeleton({ className }) {
  return <div className={clsx('animate-pulse rounded-md bg-white/[0.06]', className)} />
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl2 border border-white/[0.06] bg-ink-800/70 p-6">
      <Skeleton className="h-5 w-24" />
      <Skeleton className="mt-4 h-8 w-32" />
      <Skeleton className="mt-2 h-4 w-40" />
      <div className="mt-5 space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <Skeleton className="mt-6 h-11 w-full rounded-xl" />
    </div>
  )
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-5 py-4">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-16" />
      <Skeleton className="ml-auto h-6 w-20 rounded-full" />
    </div>
  )
}
