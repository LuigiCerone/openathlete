import { Container } from '@/components/landing/container';
import { m } from '@/paraglide/messages';

export function TopBar() {
  return (
    <div className="border-b border-border/50 bg-gradient-to-r from-muted/40 via-background to-muted/40 py-2.5 backdrop-blur-md dark:from-muted/20 dark:via-background/90 dark:to-muted/20">
      <Container>
        <p className="text-center text-[13px] font-medium tracking-wide text-muted-foreground">
          {m.landing_topbar()}
        </p>
      </Container>
    </div>
  );
}
