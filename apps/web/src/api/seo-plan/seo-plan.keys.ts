export const seoPlanKeys = {
  root: 'SeoPlanAPI',
  all: ['SeoPlanAPI'] as const,
  temporaryPlan: (token: string | null) =>
    ['SeoPlanAPI', 'temporaryPlan', token] as const,
  create: ['SeoPlanAPI', 'create'] as const,
  import: ['SeoPlanAPI', 'import'] as const,
} as const;
