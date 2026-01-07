import { useGetMeQuery } from '@/api/user';
import { useAuthContext } from '@/contexts/auth';
import { getPath } from '@/routes/paths';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const PLAN_TOKEN_STORAGE_KEY = 'pendingPlanToken';

type Props = {
  children: React.ReactNode;
};

export function AuthGuard({ children }: Props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();

  const { authenticated } = useAuthContext();
  const { data: user, isLoading } = useGetMeQuery();

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated) {
      const planToken = searchParams.get('planToken');
      if (planToken) {
        sessionStorage.setItem(PLAN_TOKEN_STORAGE_KEY, planToken);
        navigate(`${getPath(['auth', 'login'])}?planToken=${planToken}`);
      } else {
        navigate(getPath(['auth', 'login']));
      }
      return;
    }

    if (isLoading) return;

    if (user) {
      if (
        !user.onboardingCompleted &&
        pathname !== getPath(['dashboard', 'onboarding'])
      ) {
        navigate(getPath(['dashboard', 'onboarding']));
      }
      setChecked(true);
      return;
    }

    if (authenticated) {
      setChecked(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, navigate, user, isLoading]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, user, isLoading]);

  if (!checked) {
    return null;
  }

  return children;
}
