import { z } from 'zod';

// ============================================================================
// Import Training Plan DTOs
// ============================================================================
// DTOs for importing a temporary training plan into a user's account.
// ============================================================================

// DTO for the request body (token is in URL, only startDate in body)
export const importPlanBodyDtoSchema = z.object({
  startDate: z.coerce.date(),
});

export type ImportPlanBodyDto = z.infer<typeof importPlanBodyDtoSchema>;

// DTO for the full import request (used by frontend)
export const importPlanDtoSchema = z.object({
  planToken: z.string().uuid(),
  startDate: z.coerce.date(),
});

export type ImportPlanDto = z.infer<typeof importPlanDtoSchema>;

export const createTemporaryPlanDtoSchema = z.object({
  planData: z.unknown(), // Will be validated as SEOPlanData
});

export type CreateTemporaryPlanDto = z.infer<
  typeof createTemporaryPlanDtoSchema
>;
