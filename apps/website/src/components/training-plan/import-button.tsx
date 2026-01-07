'use client';

import { Button } from '@/components/ui/button';
import { API_URL, APP_URL } from '@/config';
import { m } from '@/paraglide/messages';
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

import { SEOPlanData } from '@openathlete/shared';

interface ImportButtonProps {
  planData: SEOPlanData;
  locale: string;
}

export function ImportButton({ planData }: ImportButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleImport = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/seo-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create temporary plan');
      }

      const { token } = await response.json();

      const importUrl = `${APP_URL}/dashboard?planToken=${token}`;
      window.location.href = importUrl;
    } catch (error) {
      console.error('Error importing plan:', error);
      setIsLoading(false);
      window.location.href = `${APP_URL}/auth/create-account`;
    }
  };

  return (
    <div className="flex justify-center">
      <Button size="lg" onClick={handleImport} isLoading={isLoading}>
        {m.training_plan_import_button()}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
