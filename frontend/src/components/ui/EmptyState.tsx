import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { Inbox } from 'lucide-react';
import { Button } from './Button';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({ icon: Icon = Inbox, title, description, actionLabel, onAction, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16 text-center', className)}>
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface-container-high text-on-surface-variant">
        <Icon className="h-7 w-7" aria-hidden />
      </div>
      <h3 className="text-headline-md font-semibold text-on-surface">{title}</h3>
      {description && <p className="mt-2 max-w-sm text-body-md text-on-surface-variant">{description}</p>}
      {actionLabel && onAction && (
        <Button className="mt-6" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export function LoadingState({ message = 'Loading...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20" role="status" aria-live="polite">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary-container border-t-transparent" />
      <p className="mt-4 text-body-md text-on-surface-variant">{message}</p>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="animate-pulse space-y-6 p-6">
      <div className="h-8 w-48 rounded-lg bg-surface-container-high" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-28 rounded-xl bg-surface-container-high" />
        ))}
      </div>
      <div className="h-64 rounded-xl bg-surface-container-high" />
    </div>
  );
}
