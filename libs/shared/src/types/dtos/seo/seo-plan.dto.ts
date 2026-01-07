import { z } from 'zod';

import { CYCLE_PHASE, SPORT_TYPE } from '../../misc';
import { createWorkoutStepDtoSchema } from '../core/workout.dto';

// ============================================================================
// SEO Training Plan DTOs
// ============================================================================
// DTOs for SEO training plan data structure used for displaying and importing
// training plans from the website to the app.
// ============================================================================

const elevationGainRangeSchema = z.object({
  min: z.number(),
  max: z.number().optional(),
});

export type ElevationGainRange = z.infer<typeof elevationGainRangeSchema>;

const planSessionSchema = z.object({
  dayOfWeek: z.number().min(0).max(6), // 0-6 (sunday-saturday)
  name: z.string().min(1),
  sport: z.nativeEnum(SPORT_TYPE),
  description: z.string(),
  goalDistance: z.number().optional().nullable(),
  goalDuration: z.number().optional().nullable(), // seconds
  goalElevationGain: z.number().optional().nullable(),
  goalRpe: z.number().optional().nullable(),
  workout: z
    .object({
      steps: z.array(createWorkoutStepDtoSchema).default([]),
    })
    .optional()
    .nullable(),
});

export type PlanSession = z.infer<typeof planSessionSchema>;

const planWeekSchema = z.object({
  weekNumber: z.number().min(1),
  theme: z.string().optional().nullable(),
  sessions: z.array(planSessionSchema),
});

export type PlanWeek = z.infer<typeof planWeekSchema>;

const planCycleSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  phase: z.nativeEnum(CYCLE_PHASE),
  color: z.string().optional().nullable(),
  weeks: z.array(planWeekSchema),
});

export type PlanCycle = z.infer<typeof planCycleSchema>;

const planInfoSchema = z.object({
  name: z.string().min(1),
  description: z.string(),
  goal: z.string().min(1),
  sportType: z.nativeEnum(SPORT_TYPE),
  distance: z.number(), // meters
  duration: z.number().min(1), // total duration in weeks
  // For running/triathlon : time target in seconds (ex: 16200 for 4h30)
  timeTarget: z.number().optional().nullable(),
  // For trail : positive elevation gain range (ex: 2000 for "2000d+")
  elevationGainRange: elevationGainRangeSchema.optional().nullable(),
});

export type PlanInfo = z.infer<typeof planInfoSchema>;

export const seoPlanDataSchema = z.object({
  plan: planInfoSchema,
  cycles: z.array(planCycleSchema),
});

export type SEOPlanData = z.infer<typeof seoPlanDataSchema>;
