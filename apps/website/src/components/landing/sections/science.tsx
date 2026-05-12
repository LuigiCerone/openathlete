import { Container } from '@/components/landing/container';
import { LandingSectionHeader } from '@/components/landing/landing-canvas';
import { Section } from '@/components/landing/section';
import { m } from '@/paraglide/messages';

export function Science() {
  return (
    <Section id="science" surface="default">
      <Container>
        <LandingSectionHeader
          title={m.landing_science_title()}
          titleId="science-heading"
        />

        <div className="mx-auto mt-12 max-w-3xl">
          <div className="rounded-2xl border border-border/50 bg-card/25 p-6 shadow-inner backdrop-blur-sm sm:p-8 dark:bg-card/15">
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground sm:text-[15px] sm:leading-relaxed">
              {m.landing_science_p1()}
            </p>
            <p className="mt-5 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-[15px] sm:leading-relaxed">
              {m.landing_science_p2()}
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
