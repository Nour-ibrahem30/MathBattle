import { cn } from '@/lib/utils';

export function Avatar({ name, className, size = 'md' }: { name: string; className?: string; size?: 'sm' | 'md' | 'lg' }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  const sizes = { sm: 'h-8 w-8 text-label-sm', md: 'h-10 w-10 text-label-md', lg: 'h-14 w-14 text-body-md' };
  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-primary-fixed font-semibold text-primary',
        sizes[size],
        className,
      )}
      aria-hidden
    >
      {initials}
    </div>
  );
}
