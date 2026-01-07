'use client';

import { SEOPlanData } from '@openathlete/shared';

import { ImportButton } from './import-button';
import { OpenAthleteIntro } from './openathlete-intro';
import { PlanOverview } from './plan-overview';
import { PlanTable } from './plan-table';
import { TrainingTips } from './training-tips';

interface TrainingPlanPageProps {
  planData: SEOPlanData;
  sport: 'running' | 'trail' | 'triathlon';
  distance: string;
  variant: string;
  locale: string;
}

export function TrainingPlanPage({
  planData,
  sport,
  distance,
  variant,
  locale,
}: TrainingPlanPageProps) {
  return (
    <div className="py-12 space-y-12">
      <PlanOverview
        planData={planData}
        sport={sport}
        distance={distance}
        variant={variant}
        locale={locale}
      />

      <TrainingTips />

      <PlanTable planData={planData} locale={locale} />

      <OpenAthleteIntro />

      <ImportButton planData={planData} locale={locale} />
    </div>
  );
}
