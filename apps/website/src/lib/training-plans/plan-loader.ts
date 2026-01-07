import { readFile } from 'fs/promises';
import { join } from 'path';

import { SEOPlanData, seoPlanDataSchema } from '@openathlete/shared';

import { getPlanPathFromRoute } from './utils/get-plan-path';

/**
 * Load a training plan JSON file
 * @param sport - Sport type from route
 * @param distance - Distance from route
 * @param variant - Variant from route
 * @returns Parsed and validated plan data
 * @throws Error if file not found or invalid
 */
export async function loadPlan(
  sport: string,
  distance: string,
  variant: string,
): Promise<SEOPlanData> {
  const planPath = getPlanPathFromRoute(sport, distance, variant);
  const fullPath = join(
    process.cwd(),
    'src/lib/training-plans/plans',
    planPath,
  );

  try {
    const fileContent = await readFile(fullPath, 'utf-8');
    const planData = JSON.parse(fileContent);

    // Validate plan data
    const validationResult = seoPlanDataSchema.safeParse(planData);
    if (!validationResult.success) {
      throw new Error(`Invalid plan data: ${validationResult.error.message}`);
    }

    return validationResult.data;
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      throw new Error(`Plan not found: ${planPath}`);
    }
    throw error;
  }
}
