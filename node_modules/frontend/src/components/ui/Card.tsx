import { cn } from '@/lib/utils';
import type { HTMLAttributes } from 'react';

type CardVariant = 'surface' | 'hero' | 'metric' | 'ai';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hover?: boolean;
}

const variantStyles: Record<CardVariant, string> = {
  surface: 'bg-surface-container-lowest border border-outline-variant/60 shadow-card',
  hero: 'bg-primary-container text-white border-0 shadow-elevated',
  metric: 'bg-surface-container-lowest border border-outline-variant/40 shadow-card',
  ai: 'bg-surface-container-lowest border border-secondary/20 shadow-ai-glow',
};

export function Card({ className, variant = 'surface', hover, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-xl p-6',
        variantStyles[variant],
        hover && 'transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elevated cursor-pointer',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mb-4 flex flex-col gap-1', className)} {...props} />;
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className={cn('text-headline-md font-semibold text-on-surface', className)} {...props} />;
}

export function CardDescription({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn('text-body-md text-on-surface-variant', className)} {...props} />;
}
