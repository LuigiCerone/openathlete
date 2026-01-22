import { m } from '@/paraglide/messages';
import { ExternalLink } from 'lucide-react';

import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface IOSPaymentBlockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function IOSPaymentBlockDialog({
  open,
  onOpenChange,
}: IOSPaymentBlockDialogProps) {
  const handleGoToWeb = () => {
    const webUrl =
      import.meta.env.VITE_WEB_URL || 'https://app.openathlete.org';
    window.open(webUrl, '_blank');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">
            {m.ios_payment_block_title()}
          </DialogTitle>
          <DialogDescription className="text-base pt-2">
            {m.ios_payment_block_description()}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground">
            {m.ios_payment_block_message()}
          </p>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="w-full sm:w-auto"
          >
            {m.cancel()}
          </Button>
          <Button onClick={handleGoToWeb} className="w-full sm:w-auto">
            <ExternalLink className="w-4 h-4 mr-2" />
            {m.ios_payment_block_go_to_web()}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
