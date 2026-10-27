import { DEMO_BANNER } from "@/config";
import { az } from "@/i18n/az";

export function DemoBanner() {
  if (!DEMO_BANNER) return null;
  return (
    <div role="note" className="bg-ink px-4 py-2 text-center text-[13px] font-semibold text-salad">
      {az.demoBanner}
    </div>
  );
}
