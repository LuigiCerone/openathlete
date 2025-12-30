import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";
import { BrandLogo } from "@/components/brand-logo";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <div className="flex items-center gap-2">
          <BrandLogo className="h-6 w-auto" />
          <span>OpenAthlete</span>
        </div>
      ),
    },
  };
}
