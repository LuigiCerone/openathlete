'use client';

import { formatElevationRange } from '@/lib/training-plans/utils/parse-elevation-range';
import { formatTimeTarget } from '@/lib/training-plans/utils/parse-time-target';
import { m } from '@/paraglide/messages';

import { SEOPlanData } from '@openathlete/shared';

interface PlanOverviewProps {
  planData: SEOPlanData;
  sport: 'running' | 'trail' | 'triathlon';
  distance: string;
  variant: string;
  locale: string;
}

export function PlanOverview({ planData, sport, variant }: PlanOverviewProps) {
  const { plan } = planData;

  // Format distance
  const distanceDisplay =
    plan.distance >= 1000
      ? `${(plan.distance / 1000).toFixed(1)}km`
      : `${plan.distance}m`;

  // Format variant based on sport
  let variantDisplay = variant;
  if (sport === 'running' || sport === 'triathlon') {
    if (plan.timeTarget) {
      variantDisplay = formatTimeTarget(plan.timeTarget);
    }
  } else if (sport === 'trail') {
    if (plan.elevationGainRange) {
      variantDisplay = formatElevationRange(plan.elevationGainRange);
    }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        {plan.name}
      </h1>
      {plan.description && (
        <p className="text-lg text-muted-foreground">{plan.description}</p>
      )}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span>
          {m.training_plan_distance()} {distanceDisplay}
        </span>
        {plan.timeTarget && (
          <span>
            {m.training_plan_target_time()} {variantDisplay}
          </span>
        )}
        {plan.elevationGainRange && (
          <span>
            {m.training_plan_elevation_gain()} {variantDisplay}
          </span>
        )}
        <span>
          {m.training_plan_duration()} {plan.duration} {m.training_plan_weeks()}
        </span>
      </div>
    </div>
  );
}
