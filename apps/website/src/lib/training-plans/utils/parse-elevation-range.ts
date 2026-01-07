/**
 * Parse elevation range string (e.g., "2000d+", "1000-2000d+") to object
 * @param elevationStr - Elevation string in format like "2000d+", "1000-2000d+"
 * @returns Elevation range object with min and optional max, or null if invalid
 */
export function parseElevationRange(elevationStr: string): {
  min: number;
  max?: number;
} | null {
  // Remove spaces and convert to lowercase
  const cleaned = elevationStr.trim().toLowerCase();

  // Remove "d+" suffix if present
  const withoutSuffix = cleaned.replace(/d\+?$/, '');

  // Match range pattern like "1000-2000"
  const rangeMatch = withoutSuffix.match(/^(\d+)-(\d+)$/);
  if (rangeMatch) {
    const min = parseInt(rangeMatch[1], 10);
    const max = parseInt(rangeMatch[2], 10);
    if (min >= 0 && max >= min) {
      return { min, max };
    }
  }

  // Match single value pattern like "2000"
  const singleMatch = withoutSuffix.match(/^(\d+)$/);
  if (singleMatch) {
    const min = parseInt(singleMatch[1], 10);
    if (min >= 0) {
      return { min }; // No max means "min+"
    }
  }

  return null;
}

/**
 * Format elevation range object to string (e.g., {min: 2000} -> "2000d+")
 * @param range - Elevation range object
 * @returns Formatted elevation string
 */
export function formatElevationRange(range: {
  min: number;
  max?: number;
}): string {
  if (range.max !== undefined) {
    return `${range.min}-${range.max}d+`;
  }
  return `${range.min}d+`;
}
