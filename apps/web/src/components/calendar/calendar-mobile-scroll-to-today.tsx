import { Button } from '@/components/ui/button';
import { m } from '@/paraglide/messages';
import { cn } from '@/utils/shadcn';
import { Virtualizer } from '@tanstack/react-virtual';
import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type ListItem =
  | { type: 'week-header'; week: Date[]; weekIndex: number }
  | { type: 'day'; day: Date; dayIndex: number };

interface P {
  scrollToToday: () => void;
  todayIndex: number;
  currentScrollIndex: number | null;
  items: ListItem[];
  virtualizer: Virtualizer<HTMLDivElement, Element>;
}

export function CalendarMobileScrollToToday({
  scrollToToday,
  todayIndex,
  currentScrollIndex,
  items,
  virtualizer,
}: P) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (todayIndex < 0) {
      setIsVisible(false);
      return;
    }

    if (currentScrollIndex === null) {
      setIsVisible(false);
      return;
    }

    const virtualItems = virtualizer.getVirtualItems();
    if (virtualItems.length === 0) {
      setIsVisible(false);
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let minDistance = Infinity;
    for (const virtualItem of virtualItems) {
      const item = items[virtualItem.index];
      if (item && item.type === 'day') {
        const itemDate = new Date(item.day);
        itemDate.setHours(0, 0, 0, 0);
        const diffTime = Math.abs(itemDate.getTime() - today.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        minDistance = Math.min(minDistance, diffDays);
      }
    }

    if (minDistance === Infinity) {
      setIsVisible(false);
      return;
    }

    const shouldShow = minDistance > 1;
    setIsVisible(shouldShow);
  }, [currentScrollIndex, todayIndex, items, virtualizer]);

  if (todayIndex < 0 || currentScrollIndex === null) {
    return null;
  }

  const buttonContent = (
    <div
      className={cn(
        'fixed right-4 z-10 md:hidden pointer-events-none transition-opacity duration-300',
        isVisible ? 'opacity-100' : 'opacity-0',
      )}
      style={{
        bottom: 'calc(64px + env(safe-area-inset-bottom) + 1rem)',
      }}
    >
      <Button
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg pointer-events-auto"
        onClick={scrollToToday}
        aria-label={m.calendar_current_month()}
      >
        <Calendar className="h-5 w-5" />
      </Button>
    </div>
  );

  if (typeof window !== 'undefined') {
    return createPortal(buttonContent, document.body);
  }

  return buttonContent;
}
