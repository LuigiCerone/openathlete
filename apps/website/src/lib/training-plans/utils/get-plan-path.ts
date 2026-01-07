/**
 * Get the file path for a training plan JSON based on sport, distance, and variant
 * @param sport - Sport type: 'running', 'trail', or 'triathlon'
 * @param distance - Distance identifier (e.g., 'marathon', '50km', 'ironman')
 * @param variant - Variant identifier (e.g., '4h30', '2000d+', '12h')
 * @returns File path relative to plans directory
 */
export function getPlanPath(
  sport: 'running' | 'trail' | 'triathlon',
  distance: string,
  variant: string,
): string {
  // Normalize distance and variant for filename
  const normalizedDistance = distance.toLowerCase().replace(/\s+/g, '-');
  const normalizedVariant = variant.toLowerCase().replace(/\s+/g, '');

  return `${sport}/${normalizedDistance}-${normalizedVariant}.json`;
}

/**
 * Parse route parameters to get plan file path
 * @param sport - Sport from route
 * @param distance - Distance from route
 * @param variant - Variant from route (timeTarget or elevationRange)
 * @returns File path relative to plans directory
 */
export function getPlanPathFromRoute(
  sport: string,
  distance: string,
  variant: string,
): string {
  // Validate sport
  if (!['running', 'trail', 'triathlon'].includes(sport.toLowerCase())) {
    throw new Error(`Invalid sport: ${sport}`);
  }

  return getPlanPath(
    sport.toLowerCase() as 'running' | 'trail' | 'triathlon',
    distance,
    variant,
  );
}
