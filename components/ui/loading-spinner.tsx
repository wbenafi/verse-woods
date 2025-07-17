import { cn } from '@/lib/utils'

interface LoadingSpinnerProps {
  className?: string
}

export function LoadingSpinner({ className }: LoadingSpinnerProps) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div
        className={cn(
          'animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600',
          className
        )}
      />
    </div>
  )
}