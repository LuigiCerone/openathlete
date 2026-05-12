import { useCreateCheckout, useCurrentSubscription } from '@/api/subscription';
import { SparklesIcon } from '@/components/ui/sparkles-icon';
import { m } from '@/paraglide/messages';
import {
  AnalyticsEvent,
  analyticsErrorCodeFromUnknown,
} from '@/utils/analytics-events';
import { isPaymentDisabled } from '@/utils/capacitor';
import { Users } from 'lucide-react';
import { usePostHog } from 'posthog-js/react';
import { useEffect, useState } from 'react';

import { PLAN_CONFIGS, SubscriptionPlan } from '@openathlete/shared';

import { IOSPaymentBlockDialog } from '../payment/ios-payment-block-dialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { PlanCard } from './plan-card';

type PaywallReason = 'ai-feature' | 'athlete-limit';

interface PaywallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reason?: PaywallReason;
  /** Where the paywall was opened from (PostHog). */
  analyticsSource?: string;
}

// Group plans by category
const ATHLETE_PLANS = [SubscriptionPlan.ATHLETE_PRO];
const COACH_PLANS = [SubscriptionPlan.COACH_PRO, SubscriptionPlan.COACH_ULTRA];
const CLUB_PLANS = [SubscriptionPlan.CLUB_PRO, SubscriptionPlan.CLUB_ULTRA];

export function PaywallDialog({
  open,
  onOpenChange,
  reason = 'ai-feature',
  analyticsSource = 'paywall_dialog',
}: PaywallDialogProps) {
  const posthog = usePostHog();
  const createCheckout = useCreateCheckout();
  const { data: currentSubscription } = useCurrentSubscription();
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(
    null,
  );
  const [activeTab, setActiveTab] = useState<'athlete' | 'coach' | 'club'>(
    'athlete',
  );
  const [showIOSPaymentBlock, setShowIOSPaymentBlock] = useState(false);

  useEffect(() => {
    if (!open) return;
    posthog?.capture(AnalyticsEvent.ai_paywall_viewed, {
      reason: reason === 'ai-feature' ? 'ai_feature' : 'athlete_limit',
      source: analyticsSource,
    });
  }, [open, reason, analyticsSource, posthog]);

  const handleUpgrade = async (plan: SubscriptionPlan) => {
    // Check if payments are disabled (iOS)
    if (isPaymentDisabled()) {
      setShowIOSPaymentBlock(true);
      return;
    }

    setSelectedPlan(plan);
    try {
      const successUrl = `${window.location.origin}/dashboard/settings?tab=subscription&success=true`;
      const cancelUrl = `${window.location.origin}/dashboard/settings?tab=subscription&canceled=true`;

      const { url } = await createCheckout.mutateAsync({
        plan,
        successUrl,
        cancelUrl,
      });

      window.location.href = url;
    } catch (error) {
      console.error('Failed to create checkout session:', error);
      posthog?.capture(AnalyticsEvent.subscription_checkout_failed, {
        plan,
        source: analyticsSource,
        error_code: analyticsErrorCodeFromUnknown(error),
      });
    }
  };

  const isAIReason = reason === 'ai-feature';
  const currentPlan = currentSubscription?.plan as SubscriptionPlan | undefined;

  // Filter plans based on reason, but always include current plan
  const getFilteredPlans = (plans: SubscriptionPlan[]) => {
    return plans.filter((plan) => {
      const config = PLAN_CONFIGS[plan];
      // Always show current plan
      if (currentPlan === plan) {
        return true;
      }
      if (isAIReason) {
        // For AI features, show all paid plans
        return config.plan !== SubscriptionPlan.FREE;
      } else {
        // For athlete limit, show plans that allow coaching athletes
        return (
          config.plan !== SubscriptionPlan.FREE &&
          config.plan !== SubscriptionPlan.ATHLETE_PRO
        );
      }
    });
  };

  const filteredAthletePlans = getFilteredPlans(ATHLETE_PLANS);
  const filteredCoachPlans = getFilteredPlans(COACH_PLANS);
  const filteredClubPlans = getFilteredPlans(CLUB_PLANS);

  // Auto-select the correct tab based on current plan
  useEffect(() => {
    if (currentPlan) {
      if (ATHLETE_PLANS.includes(currentPlan)) {
        setActiveTab('athlete');
      } else if (COACH_PLANS.includes(currentPlan)) {
        setActiveTab('coach');
      } else if (CLUB_PLANS.includes(currentPlan)) {
        setActiveTab('club');
      }
    }
  }, [currentPlan]);

  // If payments are disabled (iOS), show unavailable message
  if (isPaymentDisabled()) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">
              {m.feature_unavailable_ios()}
            </DialogTitle>
            <DialogDescription className="text-base pt-2">
              {m.feature_unavailable_ios_description()}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            {isAIReason ? (
              <SparklesIcon className="w-8 h-8 text-primary" />
            ) : (
              <Users className="w-8 h-8 text-primary" />
            )}
            <DialogTitle className="text-2xl">
              {isAIReason
                ? m.paywall_ai_feature_title()
                : m.paywall_athlete_limit_title()}
            </DialogTitle>
          </div>
          <DialogDescription className="text-base">
            {isAIReason
              ? m.paywall_ai_feature_description()
              : m.paywall_athlete_limit_description()}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as typeof activeTab)}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="athlete">
                {m.paywall_tab_athlete()}
              </TabsTrigger>
              <TabsTrigger value="coach">{m.paywall_tab_coach()}</TabsTrigger>
              <TabsTrigger value="club">{m.paywall_tab_club()}</TabsTrigger>
            </TabsList>

            <TabsContent value="athlete" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAthletePlans.map((plan) => {
                  const config = PLAN_CONFIGS[plan];
                  return (
                    <PlanCard
                      key={config.plan}
                      plan={config}
                      onSelect={() => handleUpgrade(config.plan)}
                      isLoading={
                        createCheckout.isPending && selectedPlan === config.plan
                      }
                      isCurrentPlan={currentPlan === config.plan}
                    />
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="coach" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCoachPlans.map((plan) => {
                  const config = PLAN_CONFIGS[plan];
                  return (
                    <PlanCard
                      key={config.plan}
                      plan={config}
                      onSelect={() => handleUpgrade(config.plan)}
                      isLoading={
                        createCheckout.isPending && selectedPlan === config.plan
                      }
                      isCurrentPlan={currentPlan === config.plan}
                    />
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="club" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredClubPlans.map((plan) => {
                  const config = PLAN_CONFIGS[plan];
                  return (
                    <PlanCard
                      key={config.plan}
                      plan={config}
                      onSelect={() => handleUpgrade(config.plan)}
                      isLoading={
                        createCheckout.isPending && selectedPlan === config.plan
                      }
                      isCurrentPlan={currentPlan === config.plan}
                    />
                  );
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
      <IOSPaymentBlockDialog
        open={showIOSPaymentBlock}
        onOpenChange={setShowIOSPaymentBlock}
      />
    </Dialog>
  );
}
