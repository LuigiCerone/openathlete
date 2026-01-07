import { SEOPlanData } from '@openathlete/shared';

interface TrainingPlanStructuredDataProps {
  planData: SEOPlanData;
  url: string;
  locale: string;
}

export function TrainingPlanStructuredData({
  planData,
  url,
}: TrainingPlanStructuredDataProps) {
  const { plan } = planData;

  // Create HowTo structured data
  const howToSteps = planData.cycles.flatMap((cycle) =>
    cycle.weeks.slice(0, 4).flatMap((week) =>
      week.sessions.map((session) => ({
        '@type': 'HowToStep',
        name: session.name,
        text: session.description,
      })),
    ),
  );

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: plan.name,
    description: plan.description || plan.goal,
    url,
    totalTime: `P${plan.duration}W`, // ISO 8601 duration format
    step: howToSteps.slice(0, 20), // Limit to 20 steps for SEO
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
