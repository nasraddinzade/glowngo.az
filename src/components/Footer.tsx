import Link from "next/link";
import { Logo } from "./Logo";
import { CONTACTS, SHOW_UNCONFIRMED, UNCONFIRMED, WHATSAPP_PHONE } from "@/config";
import { az } from "@/i18n/az";

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-bone">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Logo size={72} />
          <p className="display mt-5 text-4xl text-salad">{az.footer.slogan}</p>
          <p className="mt-2 text-sm text-bone/70">{az.footer.tagline}</p>
        </div>

        <dl className="space-y-4 text-[15px]">
          <div>
            <dt className="text-sm text-bone/60">{az.stores.phone}</dt>
            <dd>
              <a href={`https://wa.me/${WHATSAPP_PHONE}`} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-salad">
                {CONTACTS.phone}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm text-bone/60">{az.stores.instagram}</dt>
            <dd>
              <a href={CONTACTS.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-salad">
                {CONTACTS.instagram}
              </a>
            </dd>
          </div>
          {SHOW_UNCONFIRMED && (
            <div>
              <dt className="text-sm text-bone/60">{az.stores.tiktok}</dt>
              <dd className="font-semibold">{UNCONFIRMED.tiktok}</dd>
            </div>
          )}
        </dl>

        <dl className="space-y-4 text-[15px]">
          <div>
            <dt className="text-sm text-bone/60">{az.stores.store}</dt>
            <dd className="font-semibold">{CONTACTS.store}</dd>
            {SHOW_UNCONFIRMED &&
              UNCONFIRMED.stores.map((s) => (
                <dd key={s} className="font-semibold">
                  {s}
                </dd>
              ))}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2 pt-2 text-sm text-bone/70">
            <Link href="/shop" className="hover:text-salad">{az.nav.shop}</Link>
            <Link href="/magazalar" className="hover:text-salad">{az.nav.stores}</Link>
            <Link href="/istedikerim" className="hover:text-salad">{az.nav.wishlist}</Link>
          </div>
        </dl>
      </div>
    </footer>
  );
}
