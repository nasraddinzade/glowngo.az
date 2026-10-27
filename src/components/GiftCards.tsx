import { AddToList } from "./AddToList";
import { GiftCardArt } from "./GiftCard";
import { GIFT_CARD_VALUES } from "@/config";

export function GiftCards() {
  return (
    <div className="grid grid-cols-1 gap-6 min-[460px]:grid-cols-2 lg:grid-cols-4">
      {GIFT_CARD_VALUES.map((v, i) => (
        <div key={v} className="flex flex-col gap-4 [container-type:inline-size]">
          <GiftCardArt value={v} className={i % 2 ? "rotate-[1.5deg]" : "-rotate-[1.5deg]"} />
          <AddToList item={{ kind: "gift", value: v }} className="w-full" />
        </div>
      ))}
    </div>
  );
}
