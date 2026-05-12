'use client';

import { Container } from '@/components/landing/container';
import { landingTitleClass } from '@/components/landing/landing-canvas';
import { Section } from '@/components/landing/section';
import { Button } from '@/components/ui/button';
import { APP_URL } from '@/config';
import { m } from '@/paraglide/messages';
import { cn } from '@/utils/shadcn';
import { ArrowRight } from 'lucide-react';

const GITHUB_REPO_URL = 'https://github.com/openathleteorg/openathlete';

export function FinalCTA() {
  const signupUrl = `${APP_URL}/auth/create-account`;

  return (
    <Section
      animateOnScroll={false}
      className={cn(
        'relative overflow-hidden border-t border-primary/20 bg-primary py-20 text-primary-foreground md:py-28',
        'shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]',
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_80%_at_50%_-20%,rgba(255,255,255,0.14),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,transparent_40%,rgba(255,255,255,0.06)_50%,transparent_60%)]"
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={cn(
              landingTitleClass,
              'text-primary-foreground [text-shadow:0_1px_24px_rgba(0,0,0,0.12)]',
            )}
          >
            {m.landing_finalcta_title()}
          </h2>
          <div
            className="mx-auto mt-5 h-1 w-14 rounded-full bg-gradient-to-r from-primary-foreground/50 via-primary-foreground/25 to-transparent"
            aria-hidden
          />
          <p className="mt-6 text-base leading-relaxed text-primary-foreground/85 sm:text-lg">
            {m.landing_finalcta_subtitle()}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="group min-w-[11rem] shadow-lg"
            >
              <a href={signupUrl}>
                {m.landing_finalcta_primary()}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="min-w-[11rem] border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground backdrop-blur-sm hover:bg-primary-foreground/18"
              asChild
            >
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {m.landing_finalcta_secondary()}
              </a>
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
