import { Wordmark } from "./Logo";
import { Star } from "./Star";
import { az } from "@/i18n/az";

// The salad plastic card, drawn in code. It is the gift card itself, not a stand-in for a photo.
export function GiftCardArt({ value, compact = false, className = "" }: { value: number; compact?: boolean; className?: string }) {
  return (
    <div
      className={`relative aspect-[1.586] overflow-hidden rounded-[1.1rem] bg-salad p-[7%] text-ink shadow-[inset_0_0_0_1px_rgba(21,23,19,0.08),0_14px_30px_-18px_rgba(21,23,19,0.5)] ${className}`}
    >
      <Star className="absolute -right-[12%] -top-[22%] w-[62%] text-white/35" />
      <div className="relative flex h-full flex-col justify-between">
        <Wordmark className={compact ? "text-[0.8rem]" : "text-[clamp(1.25rem,5cqw,2rem)]"} />
        <div>
          {!compact && <p className="text-[11px] font-semibold uppercase tracking-[0.14em]">{az.gift.label}</p>}
          <p className={`display ${compact ? "text-[1.15rem]" : "text-[clamp(2rem,9cqw,3.25rem)]"}`}>{value} ₼</p>
        </div>
      </div>
    </div>
  );
}
