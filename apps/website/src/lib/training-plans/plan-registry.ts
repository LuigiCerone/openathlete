/**
 * Registry for mapping route parameters to plan file paths
 * This can be used to validate routes and generate sitemap entries
 */

export type PlanVariant = {
  distance: string;
  variant: string;
};

export const PLAN_REGISTRY: Record<
  'running' | 'trail' | 'triathlon',
  PlanVariant[]
> = {
  running: [
    { distance: '5km', variant: '20min' },
    { distance: '5km', variant: '25min' },
    { distance: '5km', variant: '30min' },
    { distance: '10km', variant: '40min' },
    { distance: '10km', variant: '45min' },
    { distance: '10km', variant: '50min' },
    { distance: '10km', variant: '55min' },
    { distance: 'half-marathon', variant: '1h30' },
    { distance: 'half-marathon', variant: '1h45' },
    { distance: 'half-marathon', variant: '2h' },
    { distance: 'half-marathon', variant: '2h15' },
    { distance: 'marathon', variant: '3h' },
    { distance: 'marathon', variant: '3h30' },
    { distance: 'marathon', variant: '4h' }, // done
    { distance: 'marathon', variant: '4h15' }, // done
    { distance: 'marathon', variant: '4h30' }, // done
    { distance: 'marathon', variant: '5h' }, // done
    { distance: 'marathon', variant: '5h30' }, // done
  ],
  trail: [
    { distance: '10km', variant: '0d+' },
    { distance: '10km', variant: '500d+' },
    { distance: '10km', variant: '1000d+' },
    { distance: '20km', variant: '500d+' },
    { distance: '20km', variant: '1000d+' },
    { distance: '20km', variant: '2000d+' },
    { distance: '30km', variant: '1000d+' },
    { distance: '30km', variant: '2000d+' },
    { distance: '30km', variant: '3000d+' },
    { distance: '40km', variant: '1000d+' },
    { distance: '40km', variant: '2000d+' },
    { distance: '40km', variant: '3000d+' },
    { distance: '50km', variant: '1000d+' },
    { distance: '50km', variant: '2000d+' },
    { distance: '50km', variant: '3000d+' },
    { distance: '60km', variant: '2000d+' },
    { distance: '60km', variant: '3000d+' },
    { distance: '70km', variant: '2000d+' },
    { distance: '70km', variant: '3000d+' },
    { distance: '80km', variant: '2000d+' },
    { distance: '80km', variant: '3000d+' },
  ],
  triathlon: [
    { distance: 'sprint', variant: '1h15' },
    { distance: 'sprint', variant: '1h30' },
    { distance: 'sprint', variant: '1h45' },
    { distance: 'olympic', variant: '2h30' },
    { distance: 'olympic', variant: '3h' },
    { distance: 'olympic', variant: '3h30' },
    { distance: 'half-ironman', variant: '5h30' },
    { distance: 'half-ironman', variant: '6h' },
    { distance: 'half-ironman', variant: '6h30' },
    { distance: 'half-ironman', variant: '7h' },
    { distance: 'ironman', variant: '12h' },
    { distance: 'ironman', variant: '13h' },
    { distance: 'ironman', variant: '14h' },
    { distance: 'ironman', variant: '15h' },
    { distance: 'ironman', variant: '16h' },
  ],
};

/**
 * Get all plan routes for a given sport
 */
export function getPlanRoutes(sport: 'running' | 'trail' | 'triathlon') {
  return PLAN_REGISTRY[sport];
}

/**
 * Get all plan routes for all sports
 */
export function getAllPlanRoutes(): Array<{
  sport: 'running' | 'trail' | 'triathlon';
  distance: string;
  variant: string;
}> {
  return Object.entries(PLAN_REGISTRY).flatMap(([sport, variants]) =>
    variants.map((variant) => ({
      sport: sport as 'running' | 'trail' | 'triathlon',
      ...variant,
    })),
  );
}
