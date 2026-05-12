'use client';

import { Container } from '@/components/landing/container';
import { LandingSectionHeader } from '@/components/landing/landing-canvas';
import { PricingCard } from '@/components/landing/pricing-card';
import { Section } from '@/components/landing/section';
import { APP_URL } from '@/config';
import { m } from '@/paraglide/messages';
import { cn } from '@/utils/shadcn';

const GITHUB_REPO_URL = 'https://github.com/openathleteorg/openathlete';
const GITHUB_SETUP_URL = `${GITHUB_REPO_URL}#getting-started`;

export function Pricing() {
  const signupUrl = `${APP_URL}/auth/create-account`;

  return (
    <Section id="pricing" surface="soft">
      <Container>
        <LandingSectionHeader
          title={m.landing_pricing_title()}
          titleId="pricing-heading"
          maxWidthClass="max-w-4xl"
          childrenMaxWidthClass="max-w-3xl"
        >
          <p className="text-base leading-relaxed text-muted-foreground">
            {m.landing_pricing_subtitle()}
          </p>
          <p className="mt-2 text-sm text-muted-foreground/90">
            {m.landing_pricing_note()}
          </p>
        </LandingSectionHeader>

        <div
          className={cn(
            'mx-auto mt-14 grid max-w-6xl gap-5',
            'sm:gap-6 md:grid-cols-3 md:items-stretch',
          )}
        >
          <PricingCard
            name={m.landing_pricing_selfhost_name()}
            price={m.landing_pricing_selfhost_price()}
            perks={[
              m.landing_pricing_selfhost_perk_1(),
              m.landing_pricing_selfhost_perk_2(),
              m.landing_pricing_selfhost_perk_3(),
              m.landing_pricing_selfhost_perk_4(),
            ]}
            ctaLabel={m.landing_pricing_selfhost_cta()}
            ctaHref={GITHUB_SETUP_URL}
            ctaExternal
          />
          <PricingCard
            name={m.landing_pricing_solo_name()}
            price={m.landing_pricing_solo_price()}
            priceLabel={m.landing_pricing_solo_period()}
            perks={[
              m.landing_pricing_solo_perk_1(),
              m.landing_pricing_solo_perk_2(),
              m.landing_pricing_solo_perk_3(),
              m.landing_pricing_solo_perk_4(),
            ]}
            highlighted
            badge={m.landing_pricing_popular_badge()}
            ctaLabel={m.landing_pricing_start_free_trial()}
            ctaHref={signupUrl}
          />
          <PricingCard
            name={m.landing_pricing_coach_cloud_name()}
            price={m.landing_pricing_coach_cloud_price()}
            priceLabel={m.landing_pricing_coach_cloud_period()}
            perks={[
              m.landing_pricing_coach_cloud_perk_1(),
              m.landing_pricing_coach_cloud_perk_2(),
              m.landing_pricing_coach_cloud_perk_3(),
              m.landing_pricing_coach_cloud_perk_4(),
              m.landing_pricing_coach_cloud_perk_5(),
            ]}
            ctaLabel={m.landing_pricing_start_free_trial()}
            ctaHref={signupUrl}
          />
        </div>
      </Container>
    </Section>
  );
}
