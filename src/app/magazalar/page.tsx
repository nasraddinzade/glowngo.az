import type { Metadata } from "next";
import { PageTitle } from "@/components/Section";
import { GiftCards } from "@/components/GiftCards";
import { WhatsAppButton } from "@/components/Buttons";
import { CONTACTS, SHOW_UNCONFIRMED, UNCONFIRMED } from "@/config";
import { ROUTINE_TEXT } from "@/lib/whatsapp";
import { az } from "@/i18n/az";

export const metadata: Metadata = { title: az.stores.title };

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="rounded-[var(--radius-card)] bg-white p-6">
      <p className="text-sm font-semibold text-ink/60">{label}</p>
      <div className="display mt-2 text-[clamp(1.6rem,6vw,2.4rem)] tracking-[-0.03em]">{children}</div>
    </div>
  );
}

export default function StoresPage() {
  return (
    <>
      <PageTitle title={az.stores.title} lead={az.stores.lead} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[var(--radius-card)] bg-mint p-6 md:row-span-2">
            <p className="text-sm font-semibold">{az.stores.store}</p>
            <p className="display mt-2 text-[clamp(2.4rem,9vw,4rem)]">{CONTACTS.store}</p>
            {SHOW_UNCONFIRMED && (
              <div className="mt-4 space-y-1 font-semibold">
                <p>{UNCONFIRMED.storeAddress}</p>
                {UNCONFIRMED.stores.map((s) => (
                  <p key={s}>{s}</p>
                ))}
                <p className="pt-2">
                  {az.stores.hours}: {UNCONFIRMED.hours}
                </p>
              </div>
            )}
          </div>
          <Fact label={az.stores.phone}>
            <a href={`tel:${CONTACTS.phone.replace(/\s/g, "")}`} className="hover:underline">
              {CONTACTS.phone}
            </a>
          </Fact>
          <Fact label={az.stores.instagram}>
            <a href={CONTACTS.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {CONTACTS.instagram}
            </a>
          </Fact>
          {SHOW_UNCONFIRMED && <Fact label={az.stores.tiktok}>{UNCONFIRMED.tiktok}</Fact>}
          <div className="flex items-center rounded-[var(--radius-card)] bg-ink p-6 md:col-span-2">
            <WhatsAppButton text={ROUTINE_TEXT} variant="salad">
              {az.hero.whatsapp}
            </WhatsAppButton>
          </div>
        </div>

        {SHOW_UNCONFIRMED && <p className="mt-6 text-sm text-ink/70">{UNCONFIRMED.birthday}</p>}

        <h2 className="display mb-8 mt-20 text-[clamp(2.4rem,9vw,4.75rem)]">{az.home.giftTitle}</h2>
        <p className="-mt-5 mb-8 text-base text-ink/70 sm:text-lg">{az.home.giftLead}</p>
        <GiftCards />
      </div>
    </>
  );
}
