import { cn } from '@/lib/utils';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function Input({ className, label, error, id, ...props }: InputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, '-');
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-label-md font-medium text-on-surface">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          'h-11 w-full rounded-xl border border-outline-variant bg-surface-container-low px-4 text-body-md text-on-surface',
          'placeholder:text-on-surface-variant/60 focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10',
          error && 'border-error focus:ring-error/10',
          className,
        )}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        {...props}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-label-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
