import { Loader } from '@/components/ui/loader';
import { m } from '@/paraglide/messages';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useEffect, useMemo, useRef, useState } from 'react';

import { EVENT_TYPE } from '@openathlete/shared';

import { CalendarMobileDay } from './calendar-mobile-day';
import { CalendarMobileScrollToToday } from './calendar-mobile-scroll-to-today';
import { CalendarMobileWeekHeader } from './calendar-mobile-week-header';
import { useCalendarContext } from './hooks/use-calendar-context';
import { calculateCyclesForDay } from './utils/cycle-day-layout';

interface P {
  isLoading?: boolean;
}

type ListItem =
  | { type: 'week-header'; week: Date[]; weekIndex: number }
  | { type: 'day'; day: Date; dayIndex: number };

export function CalendarMobileList({ isLoading }: P) {
  const { displayedWeeks, events, cycles, displayedMonth } =
    useCalendarContext();

  const parentRef = useRef<HTMLDivElement>(null);
  const [currentScrollIndex, setCurrentScrollIndex] = useState<number | null>(
    null,
  );
  const hasScrolledToTodayRef = useRef(false);

  const items: ListItem[] = useMemo(() => {
    const result: ListItem[] = [];
    if (displayedWeeks && displayedWeeks.length > 0) {
      displayedWeeks.forEach((week, weekIndex) => {
        result.push({
          type: 'week-header',
          week,
          weekIndex,
        });
        week.forEach((day, dayIndex) => {
          result.push({
            type: 'day',
            day,
            dayIndex: weekIndex * 7 + dayIndex,
          });
        });
      });
    }
    return result;
  }, [displayedWeeks]);

  const todayIndex = useMemo(() => {
    return items.findIndex(
      (item) =>
        item.type === 'day' &&
        item.day.toDateString() === new Date().toDateString(),
    );
  }, [items]);

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: (index) => {
      if (index >= items.length || index < 0) {
        return 120;
      }
      const item = items[index];
      if (!item) {
        return 120;
      }
      if (item.type === 'week-header') {
        return 272;
      }
      const dayEvents = events.filter(
        (event) =>
          event.startDate.toDateString() === item.day.toDateString() &&
          !(
            (event.type === EVENT_TYPE.COMPETITION ||
              event.type === EVENT_TYPE.TRAINING) &&
            event.relatedActivity
          ),
      );
      const cycleSegments = calculateCyclesForDay(cycles, item.day);
      const dayHeaderHeight = 56;
      let cycleHeight = 0;
      if (cycleSegments.length > 0) {
        cycleHeight = 48;
      }
      let eventHeight = 0;
      if (dayEvents.length > 0) {
        eventHeight = 16 + dayEvents.length * 40 + (dayEvents.length - 1) * 8;
      }
      const emptyStateHeight =
        dayEvents.length === 0 && cycleSegments.length === 0 ? 52 : 0;

      const calculatedHeight =
        dayHeaderHeight + cycleHeight + eventHeight + emptyStateHeight;

      return Math.max(calculatedHeight, 56);
    },
    overscan: 10,
  });

  useEffect(() => {
    const updateScrollIndex = () => {
      const virtualItems = virtualizer.getVirtualItems();
      if (virtualItems.length > 0) {
        const firstVisibleIndex = virtualItems[0]?.index ?? 0;
        if (firstVisibleIndex >= 0 && firstVisibleIndex < items.length) {
          setCurrentScrollIndex((prev) => {
            if (prev !== firstVisibleIndex) {
              return firstVisibleIndex;
            }
            return prev;
          });
        }
      } else if (currentScrollIndex === null && items.length > 0) {
        setCurrentScrollIndex(0);
      }
    };

    const scrollElement = parentRef.current;
    if (scrollElement && items.length > 0) {
      updateScrollIndex();
      scrollElement.addEventListener('scroll', updateScrollIndex, {
        passive: true,
      });

      const intervalId = setInterval(updateScrollIndex, 200);

      return () => {
        scrollElement.removeEventListener('scroll', updateScrollIndex);
        clearInterval(intervalId);
      };
    }
  }, [virtualizer, items.length, currentScrollIndex]);

  useEffect(() => {
    if (
      todayIndex >= 0 &&
      parentRef.current &&
      items.length > todayIndex &&
      !hasScrolledToTodayRef.current
    ) {
      const timeoutId = setTimeout(() => {
        try {
          virtualizer.scrollToIndex(todayIndex, {
            align: 'start',
            behavior: 'auto',
          });
          hasScrolledToTodayRef.current = true;
          setTimeout(() => {
            const virtualItems = virtualizer.getVirtualItems();
            if (virtualItems.length > 0) {
              setCurrentScrollIndex(virtualItems[0]?.index ?? todayIndex);
            } else {
              setCurrentScrollIndex(todayIndex);
            }
          }, 100);
        } catch {
          setCurrentScrollIndex(todayIndex);
          hasScrolledToTodayRef.current = true;
        }
      }, 100);

      return () => clearTimeout(timeoutId);
    } else if (items.length > 0 && !hasScrolledToTodayRef.current) {
      setCurrentScrollIndex(0);
      hasScrolledToTodayRef.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayedMonth, todayIndex, items.length]);

  const handleScrollToToday = () => {
    if (todayIndex >= 0) {
      virtualizer.scrollToIndex(todayIndex, {
        align: 'start',
        behavior: 'smooth',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <Loader size="lg" />
          <p className="text-sm text-muted-foreground">{m.loading()}</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-sm text-muted-foreground">{m.no_events()}</p>
      </div>
    );
  }

  return (
    <div
      ref={parentRef}
      className="w-full overflow-auto bg-background scrollbar-hide"
      style={{
        contain: 'strict',
        height:
          'calc(100vh - 56px - 64px - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
        minHeight: '500px',
        maxHeight:
          'calc(100vh - 56px - 64px - env(safe-area-inset-top) - env(safe-area-inset-bottom))',
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().length === 0 && items.length > 0 && (
          <div className="p-4 text-sm text-muted-foreground">{m.loading()}</div>
        )}
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const item = items[virtualItem.index];

          if (!item) {
            return null;
          }

          const isToday =
            item.type === 'day' &&
            item.day.toDateString() === new Date().toDateString();
          const isCurrentMonth =
            item.type === 'day' &&
            item.day.getMonth() === displayedMonth.getMonth();

          if (item.type === 'week-header') {
            const weekEvents = events.filter(
              (event) =>
                event.startDate.getTime() >= item.week[0].getTime() &&
                event.startDate.getTime() <= item.week[6].getTime(),
            );
            return (
              <div
                key={`week-${item.weekIndex}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <CalendarMobileWeekHeader
                  week={item.week}
                  events={weekEvents}
                />
              </div>
            );
          }

          const dayEvents = events.filter(
            (event) =>
              event.startDate.toDateString() === item.day.toDateString() &&
              !(
                (event.type === EVENT_TYPE.COMPETITION ||
                  event.type === EVENT_TYPE.TRAINING) &&
                event.relatedActivity
              ),
          );
          const cycleSegments = calculateCyclesForDay(cycles, item.day);

          return (
            <div
              key={`day-${item.dayIndex}`}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <CalendarMobileDay
                day={item.day}
                events={dayEvents}
                cycleSegments={cycleSegments}
                isToday={isToday}
                isCurrentMonth={isCurrentMonth}
              />
            </div>
          );
        })}
      </div>
      <CalendarMobileScrollToToday
        scrollToToday={handleScrollToToday}
        todayIndex={todayIndex}
        currentScrollIndex={currentScrollIndex}
        items={items}
        virtualizer={virtualizer}
      />
    </div>
  );
}
