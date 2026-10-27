"use client";

import { useMemo, useState } from "react";
import { ProductGrid } from "./ProductCard";
import { WhatsAppButton } from "./Buttons";
import { SearchIcon } from "./Icons";
import { brands, slugify, visibleProducts, visibleSteps } from "@/data/catalog";
import { ROUTINE_TEXT } from "@/lib/whatsapp";
import { az } from "@/i18n/az";

const norm = (s: string) =>
  s
    .toLocaleLowerCase("az")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/ə/g, "e")
    .replace(/ı/g, "i");

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full px-4 text-[14px] font-semibold transition ${
        active ? "bg-ink text-bone" : "bg-white hover:bg-ink/10"
      }`}
    >
      {children}
    </button>
  );
}

// Filters are routine step and brand only, plus search by name and brand. No sorting:
// the order is always the routine order.
export function Catalog({ initialStep = null }: { initialStep?: string | null }) {
  const [step, setStep] = useState<string | null>(initialStep);
  const [brand, setBrand] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = norm(query.trim());
    return visibleProducts.filter(
      (p) =>
        (!step || p.category === step) &&
        (!brand || slugify(p.brand) === brand) &&
        (!q || norm(`${p.brand} ${p.name}`).includes(q)),
    );
  }, [step, brand, query]);

  const dirty = step !== initialStep || brand || query;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <div className="space-y-5 rounded-[var(--radius-card)] bg-mint/60 p-4 sm:p-6">
        <label className="flex min-h-12 items-center gap-3 rounded-full bg-white px-5">
          <SearchIcon className="h-5 w-5 shrink-0 text-ink/60" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={az.shop.search}
            className="w-full min-w-0 bg-transparent text-base outline-none placeholder:text-ink/50"
          />
        </label>

        <div>
          <p className="mb-2 text-sm font-semibold">{az.shop.steps}</p>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            <Chip active={!step} onClick={() => setStep(null)}>
              {az.shop.all}
            </Chip>
            {visibleSteps.map((s) => (
              <Chip key={s.slug} active={step === s.slug} onClick={() => setStep(step === s.slug ? null : s.slug)}>
                <span className={`display inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] ${step === s.slug ? "bg-salad text-ink" : "bg-salad"}`}>
                  {s.number}
                </span>
                {s.title}
              </Chip>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold">{az.shop.brands}</p>
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
            <Chip active={!brand} onClick={() => setBrand(null)}>
              {az.shop.all}
            </Chip>
            {brands.map((b) => (
              <Chip key={b.slug} active={brand === b.slug} onClick={() => setBrand(brand === b.slug ? null : b.slug)}>
                <span lang="en" className="uppercase tracking-[0.06em]">{b.name}</span>
              </Chip>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {dirty && (
            <button
              type="button"
              onClick={() => {
                setStep(initialStep);
                setBrand(null);
                setQuery("");
              }}
              className="text-sm font-semibold underline underline-offset-4"
            >
              {az.shop.reset}
            </button>
          )}
          <WhatsAppButton text={ROUTINE_TEXT} variant="white" className="ml-auto min-h-10 text-sm">
            {az.shop.routineButton}
          </WhatsAppButton>
        </div>
      </div>

      <div className="mt-8">
        {results.length ? (
          <ProductGrid products={results} />
        ) : (
          <div className="rounded-[var(--radius-card)] bg-white p-8 text-center">
            <p className="text-lg">{az.shop.empty}</p>
            <WhatsAppButton text={ROUTINE_TEXT} className="mt-5">
              {az.hero.whatsapp}
            </WhatsAppButton>
          </div>
        )}
      </div>
    </div>
  );
}
