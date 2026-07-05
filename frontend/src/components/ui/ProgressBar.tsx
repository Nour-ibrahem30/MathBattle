import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
  label?: string;
}

export function ProgressBar({ value, max = 100, className, variant = 'primary', label }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const fill = {
    primary: 'bg-primary-container',
    secondary: 'bg-secondary-container',
    tertiary: 'bg-tertiary-container',
  }[variant];

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="mb-1 flex justify-between text-label-sm text-on-surface-variant">
          <span>{label}</span>
          <span>{Math.round(pct)}%</span>
        </div>
      )}
      <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className={cn('h-full rounded-full transition-all duration-500', fill)} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
