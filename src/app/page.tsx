import Image from "next/image";
import Link from "next/link";
import { Star } from "@/components/Star";
import { StepSticker } from "@/components/StepSticker";
import { Section } from "@/components/Section";
import { ProductGrid } from "@/components/ProductCard";
import { GiftCards } from "@/components/GiftCards";
import { LinkButton, WhatsAppButton } from "@/components/Buttons";
import { ArrowIcon } from "@/components/Icons";
import { brands, getProduct, productHref, productImage, productsOfStep, visibleProducts, visibleSteps } from "@/data/catalog";
import { CONTACTS, SHOW_UNCONFIRMED, UNCONFIRMED } from "@/config";
import { ROUTINE_TEXT } from "@/lib/whatsapp";
import { az } from "@/i18n/az";

const heroIds = [
  "medicube-pdrn-pink-collagen-exosome-shot-serum-2000",
  "tirtir-cushion",
  "anua-invisible-glow-finish-sunscreen-stick",
];
const heroTilt = ["-rotate-6", "rotate-3", "-rotate-2"];

const stepLines: Record<string, string> = {
  "toner-pad": "Təmizləmədən sonra dərini növbəti addıma hazırla.",
  "serum-esens": "Əsas iş buradadır: nəmlik, parıltı, elastiklik.",
  "krem-spf": "Nəmliyi bağla, gündüz SPF-i unutma.",
  "maska-cihaz": "Həftədə bir neçə dəfə, özünə vaxt ayıranda.",
  makiyaj: "Kuşon, BB, tint: təbii parıltı üçün.",
  sac: "Baş dərisinə də qulluq lazımdır.",
};

export default function Home() {
  const heroProducts = heroIds.map(getProduct).filter((p) => p !== undefined);
  const restocked = visibleProducts.filter((p) => p.restocked);

  return (
    <>
      {/* First screen: all salad */}
      <section className="bg-salad">
        <div className="mx-auto grid min-h-[calc(100svh-7rem)] max-w-7xl items-center gap-10 px-4 pb-14 pt-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:pb-20">
          <div>
            <h1 className="display text-[clamp(4.5rem,22.5vw,11.5rem)] lg:text-[clamp(6rem,10.5vw,11.5rem)]">
              <span className="block">{az.hero.title1}</span>
              <span className="flex items-start">
                {az.hero.title2}
                <Star className="ml-[0.06em] mt-[0.08em] w-[0.42em] shrink-0" />
              </span>
            </h1>
            <p className="mt-6 max-w-md text-lg font-semibold sm:text-xl">{az.hero.lead}</p>
            <div className="mt-7 flex flex-col gap-3 min-[420px]:flex-row">
              <LinkButton href="#rutin">{az.hero.chooseRoutine}</LinkButton>
              <WhatsAppButton text={ROUTINE_TEXT} variant="white">
                {az.hero.whatsapp}
              </WhatsAppButton>
            </div>
          </div>

          <div className="relative mx-auto grid w-full max-w-md grid-cols-3 items-end gap-3 lg:max-w-none lg:grid-cols-2 lg:gap-6">
            {heroProducts.map((p, i) => (
              <Link
                key={p.id}
                href={productHref(p)}
                className={`block rounded-[1.5rem] bg-white p-1.5 shadow-[0_24px_50px_-28px_rgba(21,23,19,0.55)] transition hover:rotate-0 ${heroTilt[i]} ${
                  i === 2 ? "lg:col-span-2 lg:mx-auto lg:w-1/2" : ""
                }`}
              >
                <Image
                  src={productImage(p)}
                  alt={`${p.brand} ${p.name}`}
                  width={800}
                  height={800}
                  priority
                  sizes="(min-width: 1024px) 22vw, 30vw"
                  className="aspect-square w-full rounded-[1.2rem] object-contain"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Section id="rutin" title={az.home.stepsTitle} lead={az.home.stepsLead}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {visibleSteps.map((s) => {
            const thumbs = productsOfStep(s.slug).slice(0, 3);
            return (
              <Link
                key={s.slug}
                href={`/step/${s.slug}`}
                className="group relative flex min-h-56 flex-col overflow-hidden rounded-[var(--radius-card)] bg-white p-5 transition hover:-translate-y-1"
              >
                <div className="flex items-start justify-between gap-3">
                  <StepSticker number={s.number} className="w-16 text-2xl transition group-hover:-rotate-12" />
                  <ArrowIcon className="h-6 w-6 opacity-40 transition group-hover:translate-x-1 group-hover:opacity-100" />
                </div>
                <h3 className="display mt-5 text-3xl">{s.title}</h3>
                <p className="mt-2 text-sm text-ink/70">{stepLines[s.slug]}</p>
                <div className="mt-auto flex -space-x-3 pt-5">
                  {thumbs.map((p) => (
                    <Image
                      key={p.id}
                      src={productImage(p)}
                      alt=""
                      width={120}
                      height={120}
                      className="h-14 w-14 rounded-full border-2 border-white bg-white object-contain shadow-sm"
                    />
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section id="brendler" title={az.home.brandsTitle} lead={az.home.brandsLead}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {brands.map((b, i) => (
            <Link
              key={b.slug}
              href={`/brands/${b.slug}`}
              lang="en"
              className={`display flex min-h-28 items-center justify-center rounded-[var(--radius-card)] px-3 text-center text-[clamp(1.25rem,5vw,1.9rem)] uppercase tracking-[-0.02em] transition hover:-rotate-2 ${
                i % 3 === 1 ? "bg-mint" : "bg-white"
              }`}
            >
              {b.name}
            </Link>
          ))}
        </div>
      </Section>

      {restocked.length > 0 && (
        <Section title={az.home.restockTitle} lead={az.home.restockLead}>
          <ProductGrid products={restocked} />
        </Section>
      )}

      <Section id="hediyye" title={az.home.giftTitle} lead={az.home.giftLead}>
        <GiftCards />
      </Section>

      <Section title={az.home.storesTitle} lead={az.home.storesLead}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-[var(--radius-card)] bg-mint p-6 sm:p-8">
            <p className="text-sm font-semibold">{az.stores.store}</p>
            <p className="display mt-2 text-4xl sm:text-5xl">{CONTACTS.store}</p>
            {SHOW_UNCONFIRMED &&
              UNCONFIRMED.stores.map((s) => (
                <p key={s} className="display mt-2 text-2xl">
                  {s}
                </p>
              ))}
          </div>
          <div className="flex flex-col justify-between gap-6 rounded-[var(--radius-card)] bg-white p-6 sm:p-8">
            <div>
              <p className="text-sm font-semibold">{az.stores.phone}</p>
              <p className="display mt-2 text-3xl">{CONTACTS.phone}</p>
            </div>
            <LinkButton href="/magazalar" variant="outline" className="self-start">
              {az.home.storesMore}
            </LinkButton>
          </div>
        </div>
      </Section>

      <section className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 sm:pt-28">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-ink p-7 text-bone sm:p-12">
          <Star className="absolute -right-10 -top-10 w-56 text-salad/90 sm:w-80" />
          <div className="relative max-w-xl">
            <h2 className="display text-[clamp(2.4rem,9vw,4.75rem)] text-salad">{az.home.routineTitle}</h2>
            <p className="mt-4 text-lg text-bone/80">{az.home.routineLead}</p>
            <WhatsAppButton text={ROUTINE_TEXT} variant="salad" className="mt-7">
              {az.home.routineButton}
            </WhatsAppButton>
          </div>
        </div>
      </section>
    </>
  );
}
