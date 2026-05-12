import { cn } from '@/utils/shadcn';
import type { ReactNode } from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  className?: string;
}

export function FeatureCard({
  title,
  description,
  icon,
  className,
}: FeatureCardProps) {
  return (
    <div
      className={cn(
        'group flex h-full flex-col rounded-2xl border border-border/50 bg-card/40 p-5 shadow-sm backdrop-blur-sm transition-all duration-300',
        'hover:-translate-y-0.5 hover:border-primary/20 hover:shadow-[0_20px_40px_-28px_rgba(0,0,0,0.15)] dark:bg-card/25 dark:hover:shadow-black/30',
        className,
      )}
    >
      {icon ? (
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary/12 to-primary/[0.04] text-primary ring-1 ring-primary/10 transition-transform duration-300 group-hover:scale-[1.04]">
          {icon}
        </div>
      ) : null}
      <h3 className="text-base font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}
