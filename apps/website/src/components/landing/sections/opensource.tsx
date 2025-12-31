'use client';

import { Container } from '@/components/landing/container';
import { FeatureCard } from '@/components/landing/feature-card';
import { Section } from '@/components/landing/section';
import { Button } from '@/components/ui/button';
import { m } from '@/paraglide/messages';
import {
  Code,
  Eye,
  Lock,
  Server,
  Shield,
  Users,
} from 'lucide-react';

const icons = [Code, Shield, Server, Eye, Users, Lock];

export function OpenSource() {
  const benefits = [
    {
      title: m.landing_opensource_benefit_1_title(),
      description: m.landing_opensource_benefit_1_desc(),
    },
    {
      title: m.landing_opensource_benefit_2_title(),
      description: m.landing_opensource_benefit_2_desc(),
    },
    {
      title: m.landing_opensource_benefit_3_title(),
      description: m.landing_opensource_benefit_3_desc(),
    },
    {
      title: m.landing_opensource_benefit_4_title(),
      description: m.landing_opensource_benefit_4_desc(),
    },
    {
      title: m.landing_opensource_benefit_5_title(),
      description: m.landing_opensource_benefit_5_desc(),
    },
    {
      title: m.landing_opensource_benefit_6_title(),
      description: m.landing_opensource_benefit_6_desc(),
    },
  ];

  return (
    <Section id="opensource" className="bg-muted/30">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {m.landing_opensource_title()}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {m.landing_opensource_subtitle()}
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = icons[index];
              return (
                <FeatureCard
                  key={index}
                  title={benefit.title}
                  description={benefit.description}
                  icon={<Icon className="h-6 w-6 text-primary" />}
                />
              );
            })}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild>
              <a
                href="https://github.com/openathleteorg/openathlete"
                target="_blank"
                rel="noopener noreferrer"
              >
                {m.landing_opensource_cta_github()}
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://docs.openathlete.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                {m.landing_opensource_cta_docs()}
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}

