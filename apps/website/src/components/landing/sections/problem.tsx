'use client';

import { Container } from '@/components/landing/container';
import { LandingSectionHeader } from '@/components/landing/landing-canvas';
import { Section } from '@/components/landing/section';
import { m } from '@/paraglide/messages';
import { motion } from 'framer-motion';
import { CloudOff, EyeOff, LockKeyhole } from 'lucide-react';

const icons = [LockKeyhole, EyeOff, CloudOff] as const;

export function Problem() {
  const points = [
    {
      label: m.landing_problem_point_1_label(),
      body: m.landing_problem_point_1_body(),
    },
    {
      label: m.landing_problem_point_2_label(),
      body: m.landing_problem_point_2_body(),
    },
    {
      label: m.landing_problem_point_3_label(),
      body: m.landing_problem_point_3_body(),
    },
  ];

  return (
    <Section id="problem" surface="soft" aria-labelledby="problem-heading">
      <Container>
        <LandingSectionHeader
          kicker={m.landing_problem_section_kicker()}
          title={m.landing_problem_title()}
          titleId="problem-heading"
        />

        <div className="mx-auto mt-14 max-w-3xl">
          <div className="relative rounded-2xl border border-border/50 bg-card/30 p-px shadow-[0_20px_50px_-24px_rgba(0,0,0,0.18)] backdrop-blur-md dark:bg-card/15 dark:shadow-black/30">
            <div className="overflow-hidden rounded-[calc(1rem-1px)] bg-gradient-to-br from-card/95 via-card/80 to-muted/25 dark:from-card/50 dark:via-card/30 dark:to-muted/10">
              <ol className="divide-y divide-border/40">
                {points.map((point, index) => {
                  const Icon = icons[index];
                  return (
                    <motion.li
                      key={point.label}
                      initial={{ opacity: 0, y: 18 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-32px' }}
                      transition={{
                        delay: index * 0.07,
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="group"
                    >
                      <div className="flex gap-4 px-5 py-6 sm:gap-5 sm:px-7 sm:py-7 md:gap-6">
                        <div className="flex shrink-0 pt-0.5">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary/12 to-primary/[0.04] text-primary shadow-inner ring-1 ring-primary/10 transition-transform duration-300 group-hover:scale-[1.03] sm:h-12 sm:w-12">
                            <Icon
                              className="h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5"
                              strokeWidth={1.65}
                              aria-hidden
                            />
                          </div>
                        </div>
                        <div className="min-w-0 flex-1 pt-0.5">
                          <h3 className="text-[0.95rem] font-semibold leading-snug tracking-tight text-foreground sm:text-base">
                            {point.label}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-[15px] sm:leading-relaxed">
                            {point.body}
                          </p>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
