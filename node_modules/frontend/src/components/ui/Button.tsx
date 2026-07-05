import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg' | 'icon';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

const variants: Record<Variant, string> = {
  primary: 'bg-primary-container text-white hover:bg-primary shadow-sm',
  secondary: 'bg-secondary text-white hover:bg-secondary/90',
  outline: 'border border-outline-variant bg-transparent text-on-surface hover:bg-surface-container-low',
  ghost: 'bg-transparent text-on-surface-variant hover:bg-surface-container-high hover:text-primary',
  danger: 'bg-error text-white hover:bg-error/90',
};

const sizes: Record<Size, string> = {
  sm: 'h-8 px-3 text-label-sm rounded-lg',
  md: 'h-10 px-4 text-label-md rounded-lg',
  lg: 'h-12 px-6 text-body-md rounded-xl font-semibold',
  icon: 'h-10 w-10 rounded-lg',
};

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  loading,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 font-label transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {children}
    </button>
  );
}
