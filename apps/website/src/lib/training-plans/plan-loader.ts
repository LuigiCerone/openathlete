import { readFile } from 'fs/promises';
import { join } from 'path';

import { SEOPlanData, seoPlanDataSchema } from '@openathlete/shared';

import { getPlanPathFromRoute } from './utils/get-plan-path';

/**
 * Load a training plan JSON file
 * @param sport - Sport type from route
 * @param distance - Distance from route
 * @param variant - Variant from route
 * @param locale - Locale code (e.g., 'en', 'fr'). Defaults to 'en' if not provided
 * @returns Parsed and validated plan data
 * @throws Error if file not found or invalid
 */
export async function loadPlan(
  sport: string,
  distance: string,
  variant: string,
  locale: string = 'en',
): Promise<SEOPlanData> {
  const planPath = getPlanPathFromRoute(sport, distance, variant, locale);
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
      console.error('validationResult.error', validationResult.error);
      throw new Error(`Invalid plan data: ${validationResult.error.message}`);
    }

    return validationResult.data;
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      // Try to fallback to 'en' locale if the requested locale file doesn't exist
      if (locale !== 'en') {
        try {
          return await loadPlan(sport, distance, variant, 'en');
        } catch {
          // If fallback also fails, try without locale extension for backward compatibility
          try {
            const legacyPath = getPlanPathFromRoute(
              sport,
              distance,
              variant,
              '',
            );
            const legacyFullPath = join(
              process.cwd(),
              'src/lib/training-plans/plans',
              legacyPath,
            );
            const fileContent = await readFile(legacyFullPath, 'utf-8');
            const planData = JSON.parse(fileContent);
            const validationResult = seoPlanDataSchema.safeParse(planData);
            if (validationResult.success) {
              return validationResult.data;
            }
          } catch {
            // If all fallbacks fail, throw original error
          }
        }
      }
      throw new Error(`Plan not found: ${planPath}`);
    }
    throw error;
  }
}
