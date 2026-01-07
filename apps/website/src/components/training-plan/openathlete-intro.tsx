'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { m } from '@/paraglide/messages';
import {
  BarChart3,
  Brain,
  CheckCircle2,
  Code,
  Shield,
  Watch,
} from 'lucide-react';

export function OpenAthleteIntro() {
  const features = [
    {
      icon: CheckCircle2,
      title: m.training_plan_feature_free(),
      description: m.training_plan_feature_free_desc(),
    },
    {
      icon: Code,
      title: m.training_plan_feature_opensource(),
      description: m.training_plan_feature_opensource_desc(),
    },
    {
      icon: Shield,
      title: m.training_plan_feature_privacy(),
      description: m.training_plan_feature_privacy_desc(),
    },
    {
      icon: Watch,
      title: m.training_plan_feature_watch(),
      description: m.training_plan_feature_watch_desc(),
    },
    {
      icon: Brain,
      title: m.training_plan_feature_ai(),
      description: m.training_plan_feature_ai_desc(),
    },
    {
      icon: BarChart3,
      title: m.training_plan_feature_analytics(),
      description: m.training_plan_feature_analytics_desc(),
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{m.training_plan_what_is_openathlete()}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div key={idx} className="flex gap-3">
                <Icon className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
