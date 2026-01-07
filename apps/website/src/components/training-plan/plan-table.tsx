'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { m } from '@/paraglide/messages';

import { SEOPlanData } from '@openathlete/shared';

interface PlanTableProps {
  planData: SEOPlanData;
  locale: string;
}

export function PlanTable({ planData }: PlanTableProps) {
  // Get first 4 weeks from all cycles
  const first4Weeks: Array<{
    weekNumber: number;
    cycleName: string;
    theme?: string | null;
    sessions: Array<{
      dayOfWeek: number;
      name: string;
      description: string;
    }>;
  }> = [];

  let weekCount = 0;
  for (const cycle of planData.cycles) {
    for (const week of cycle.weeks) {
      if (weekCount >= 4) break;
      first4Weeks.push({
        weekNumber: week.weekNumber,
        cycleName: cycle.name,
        theme: week.theme,
        sessions: week.sessions,
      });
      weekCount++;
    }
    if (weekCount >= 4) break;
  }

  const dayNames = [
    m.training_plan_day_sun(),
    m.training_plan_day_mon(),
    m.training_plan_day_tue(),
    m.training_plan_day_wed(),
    m.training_plan_day_thu(),
    m.training_plan_day_fri(),
    m.training_plan_day_sat(),
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{m.training_plan_table_title()}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {first4Weeks.map((week, weekIdx) => (
            <div key={weekIdx} className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">
                  {m.training_plan_week()} {week.weekNumber}
                </h3>
                {week.cycleName && (
                  <span className="text-sm text-muted-foreground">
                    ({week.cycleName})
                  </span>
                )}
              </div>
              {week.theme && (
                <p className="text-sm text-muted-foreground">{week.theme}</p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
                {dayNames.map((dayName, dayIdx) => {
                  const session = week.sessions.find(
                    (s) => s.dayOfWeek === dayIdx,
                  );
                  return (
                    <div
                      key={dayIdx}
                      className="border rounded-lg p-2 min-h-[80px]"
                    >
                      <div className="text-xs font-medium mb-1">{dayName}</div>
                      {session ? (
                        <div className="text-xs">
                          <div className="font-medium">{session.name}</div>
                          {session.description && (
                            <div className="text-muted-foreground mt-1">
                              {session.description.substring(0, 50)}
                              {session.description.length > 50 ? '...' : ''}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="text-xs text-muted-foreground">
                          {m.training_plan_rest()}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
