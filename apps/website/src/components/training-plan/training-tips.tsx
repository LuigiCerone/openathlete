'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { m } from '@/paraglide/messages';

export function TrainingTips() {
  const tips = [
    m.training_plan_tip_1(),
    m.training_plan_tip_2(),
    m.training_plan_tip_3(),
    m.training_plan_tip_4(),
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{m.training_plan_tips_title()}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 list-disc list-inside">
          {tips.map((tip, idx) => (
            <li key={idx} className="text-muted-foreground">
              {tip}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
