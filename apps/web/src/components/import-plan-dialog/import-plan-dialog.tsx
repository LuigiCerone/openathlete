import { useImportPlan } from '@/api/seo-plan';
import { m } from '@/paraglide/messages';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { ImportPlanDto } from '@openathlete/shared';

import { FormProvider, RHFDatePicker } from '../hook-form';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';

const importPlanFormSchema = z.object({
  startDate: z.coerce.date({
    required_error: m.start_date_required(),
  }),
});

type ImportPlanFormValues = z.infer<typeof importPlanFormSchema>;

interface ImportPlanDialogProps {
  open: boolean;
  onClose: () => void;
  planToken: string;
  planName?: string;
}

export function ImportPlanDialog({
  open,
  onClose,
  planToken,
  planName,
}: ImportPlanDialogProps) {
  const methods = useForm<ImportPlanFormValues>({
    resolver: zodResolver(importPlanFormSchema),
    defaultValues: {
      startDate: new Date(),
    },
  });

  const importPlanMutation = useImportPlan({
    onSuccess: (data) => {
      toast.success(
        m.training_plan_imported_successfully({ planName: data.name }),
      );
      methods.reset();
      // Close dialog after a short delay to allow toast to show
      setTimeout(() => {
        onClose();
      }, 100);
    },
    onError: (error) => {
      console.error('Failed to import plan:', error);
      toast.error(m.failed_to_import_training_plan());
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((data: ImportPlanFormValues) => {
    // RHFDatePicker stores date as ISO string, convert to Date
    const startDate =
      typeof data.startDate === 'string'
        ? new Date(data.startDate)
        : data.startDate instanceof Date
          ? data.startDate
          : new Date(data.startDate);

    // Validate the date
    if (isNaN(startDate.getTime())) {
      toast.error(m.failed_to_import_training_plan());
      return;
    }

    const importData: ImportPlanDto = {
      planToken,
      startDate,
    };
    importPlanMutation.mutate(importData);
  });

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      methods.reset({
        startDate: new Date(),
      });
    }
  }, [open, methods]);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{m.import_training_plan()}</DialogTitle>
        </DialogHeader>
        <FormProvider
          methods={methods}
          onSubmit={onSubmit}
          className="flex flex-col gap-4 pt-3"
        >
          {planName && (
            <div className="text-sm text-muted-foreground">
              {m.importing_plan_name({ planName })}
            </div>
          )}
          <RHFDatePicker
            name="startDate"
            label={m.training_plan_start_date()}
            required
            min={new Date()}
          />
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              {m.cancel()}
            </Button>
            <Button
              type="submit"
              className="flex-1"
              isLoading={importPlanMutation.isPending}
            >
              {m.import_action()}
            </Button>
          </div>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
