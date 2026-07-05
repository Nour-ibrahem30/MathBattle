import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outline';
}

const variants = {
  default: 'bg-surface-container-high text-on-surface-variant',
  primary: 'bg-primary-fixed text-primary',
  secondary: 'bg-secondary-fixed text-secondary',
  success: 'bg-success-container text-success',
  warning: 'bg-tertiary-fixed text-tertiary',
  error: 'bg-error-container text-error',
  outline: 'border border-outline-variant text-on-surface-variant bg-transparent',
};

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-label-sm font-semibold uppercase tracking-wide',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
