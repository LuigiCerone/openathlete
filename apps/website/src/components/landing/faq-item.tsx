'use client';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { cn } from '@/utils/shadcn';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface FAQItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
  className?: string;
}

export function FAQItem({
  question,
  answer,
  defaultOpen = false,
  className,
}: FAQItemProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className={cn(className)}>
      <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 rounded-lg py-4 text-left transition-colors hover:bg-muted/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:py-5">
        <span className="cursor-pointer pr-2 text-[15px] font-semibold leading-snug tracking-tight text-foreground">
          {question}
        </span>
        <ChevronDown
          className={cn(
            'h-4 w-4 shrink-0 cursor-pointer text-muted-foreground transition-transform',
            open && 'rotate-180 text-primary',
          )}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="pb-4 pt-0.5">
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
          {answer}
        </p>
      </CollapsibleContent>
    </Collapsible>
  );
}
