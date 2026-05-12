'use client';

import { Container } from '@/components/landing/container';
import { LandingSectionHeader } from '@/components/landing/landing-canvas';
import { Section } from '@/components/landing/section';
import { Button } from '@/components/ui/button';
import { m } from '@/paraglide/messages';
import { Check } from 'lucide-react';

const GITHUB_REPO_URL = 'https://github.com/openathleteorg/openathlete';

export function OpenSource() {
  const bullets = [
    m.landing_opensource_funding_bullet_1(),
    m.landing_opensource_funding_bullet_2(),
    m.landing_opensource_funding_bullet_3(),
  ];

  return (
    <Section id="opensource" surface="ridge">
      <Container>
        <LandingSectionHeader
          title={m.landing_opensource_title()}
          titleId="opensource-heading"
        >
          <p className="text-base leading-relaxed text-muted-foreground">
            {m.landing_opensource_subtitle()}
          </p>
        </LandingSectionHeader>

        <div className="mx-auto mt-12 max-w-xl">
          <div className="rounded-2xl border border-border/50 bg-card/30 p-px shadow-inner backdrop-blur-sm dark:bg-card/15">
            <ul className="divide-y divide-border/40 rounded-[calc(1rem-1px)] bg-gradient-to-br from-card/80 to-muted/15 px-4 py-2 dark:from-card/30 dark:to-muted/10">
              {bullets.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 py-3.5 text-sm text-muted-foreground sm:text-[15px]"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/15">
                    <Check className="h-3 w-3" strokeWidth={2.5} aria-hidden />
                  </span>
                  <span className="leading-relaxed text-foreground/85">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button size="lg" className="min-w-[10rem] shadow-md" asChild>
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {m.landing_opensource_cta_github()}
              </a>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="min-w-[10rem] border-border/70 bg-background/60 backdrop-blur-sm"
              asChild
            >
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
