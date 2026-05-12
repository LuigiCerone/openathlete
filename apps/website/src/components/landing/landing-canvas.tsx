import { cn } from '@/utils/shadcn';
import type { ReactNode } from 'react';

/** Decorative layers for premium marketing sections (radial + subtle grid). */
export function LandingAtmosphere() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,hsl(var(--primary)/0.07),transparent_65%)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,hsl(var(--primary)/0.12),transparent_65%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.35)_1px,transparent_1px)] bg-[size:4.5rem_1px] [mask-image:linear-gradient(90deg,black,transparent)] opacity-40 dark:opacity-25"
        aria-hidden
      />
    </>
  );
}

export const landingKickerClass =
  'text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground';

export const landingTitleClass =
  'text-balance text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-[2.2rem] md:leading-[1.2]';

export function LandingAccentBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'h-1 w-14 shrink-0 rounded-full bg-gradient-to-r from-primary/80 via-primary/40 to-transparent',
        className,
      )}
      aria-hidden
    />
  );
}

type LandingSectionHeaderProps = {
  kicker?: ReactNode;
  title: ReactNode;
  titleId?: string;
  align?: 'center' | 'left';
  showAccent?: boolean;
  maxWidthClass?: string;
  /** Max width for the block below the accent bar (e.g. pricing subtitles). */
  childrenMaxWidthClass?: string;
  children?: ReactNode;
};

export function LandingSectionHeader({
  kicker,
  title,
  titleId,
  align = 'center',
  showAccent = true,
  maxWidthClass = 'max-w-3xl',
  childrenMaxWidthClass = 'max-w-2xl',
  children,
}: LandingSectionHeaderProps) {
  return (
    <header
      className={cn(
        'mx-auto w-full',
        maxWidthClass,
        align === 'center' && 'text-center',
        align === 'left' && 'text-left',
      )}
    >
      {kicker ? <p className={landingKickerClass}>{kicker}</p> : null}
      <h2
        id={titleId}
        className={cn(landingTitleClass, kicker ? 'mt-4' : 'mt-0')}
      >
        {title}
      </h2>
      {showAccent ? (
        <LandingAccentBar
          className={cn('mt-5', align === 'center' && 'mx-auto')}
        />
      ) : null}
      {children ? (
        <div
          className={cn(
            'mt-5 w-full',
            childrenMaxWidthClass,
            align === 'center' && 'mx-auto text-center',
            align === 'left' && 'text-left',
          )}
        >
          {children}
        </div>
      ) : null}
    </header>
  );
}
