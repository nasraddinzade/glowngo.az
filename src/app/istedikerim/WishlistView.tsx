"use client";

import Image from "next/image";
import Link from "next/link";
import { LinkButton, WhatsAppButton } from "@/components/Buttons";
import { GiftCardArt } from "@/components/GiftCard";
import { getProduct, productHref, productImage } from "@/data/catalog";
import { itemKey, useWishlist } from "@/lib/wishlist";
import { giftCardTitle, orderText, productLine } from "@/lib/whatsapp";
import { az } from "@/i18n/az";
import type { Product } from "@/data/products";

type Row = { key: string; qty: number; product: Product | null; value: number };

export function WishlistView() {
  const { items, ready, setQty, remove } = useWishlist();

  if (!ready) return <div className="mx-auto h-40 max-w-3xl px-4" />;

  // Drop picks that are no longer on the site (e.g. removed from the data file).
  const rows: Row[] = items.flatMap((i): Row[] => {
    if (i.kind === "gift") return [{ key: itemKey(i), qty: i.qty, product: null, value: i.value }];
    const product = getProduct(i.id);
    return product ? [{ key: itemKey(i), qty: i.qty, product, value: 0 }] : [];
  });

  if (!rows.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="rounded-[var(--radius-card)] bg-white p-8 text-center">
          <p className="text-lg">{az.wishlist.empty}</p>
          <LinkButton href="/shop" className="mt-5">
            {az.wishlist.toShop}
          </LinkButton>
        </div>
      </div>
    );
  }

  const message = orderText(
    rows.map(({ qty, product, value }) => (product ? productLine(product, qty) : `${giftCardTitle(value)} × ${qty}`)),
  );

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <ul className="space-y-3">
        {rows.map(({ key, qty, product, value }) => (
          <li key={key} className="flex items-center gap-3 rounded-[var(--radius-card)] bg-white p-3 sm:gap-5 sm:p-4">
            {product ? (
              <Link href={productHref(product)} className="shrink-0">
                <Image
                  src={productImage(product)}
                  alt=""
                  width={160}
                  height={160}
                  className="h-20 w-20 rounded-2xl object-contain sm:h-24 sm:w-24"
                />
              </Link>
            ) : (
              <div className="w-20 shrink-0 [container-type:inline-size] sm:w-24">
                <GiftCardArt value={value} compact className="rounded-lg p-[8%]" />
              </div>
            )}

            <div className="min-w-0 flex-1">
              {product ? (
                <>
                  <p lang="en" className="text-[11px] font-semibold uppercase tracking-[0.12em]">{product.brand}</p>
                  <Link href={productHref(product)} className="display block text-lg leading-tight tracking-[-0.03em] sm:text-xl">
                    {product.name}
                  </Link>
                  {product.volume && <p className="mt-0.5 text-sm text-ink/60">{product.volume}</p>}
                </>
              ) : (
                <p className="display text-lg tracking-[-0.03em] sm:text-xl">
                  {giftCardTitle(value)}
                </p>
              )}

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center rounded-full bg-bone" role="group" aria-label={az.wishlist.qty}>
                  <button
                    type="button"
                    aria-label={az.wishlist.less}
                    onClick={() => setQty(key, qty - 1)}
                    disabled={qty <= 1}
                    className="h-10 w-10 rounded-full text-xl font-semibold disabled:opacity-30"
                  >
                    −
                  </button>
                  <span className="min-w-8 text-center font-semibold" aria-live="polite">
                    {qty}
                  </span>
                  <button
                    type="button"
                    aria-label={az.wishlist.more}
                    onClick={() => setQty(key, qty + 1)}
                    className="h-10 w-10 rounded-full text-xl font-semibold"
                  >
                    +
                  </button>
                </div>
                <button type="button" onClick={() => remove(key)} className="text-sm font-semibold underline underline-offset-4">
                  {az.wishlist.remove}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <WhatsAppButton text={message} className="mt-8 w-full min-h-14 text-base">
        {az.wishlist.send}
      </WhatsAppButton>
    </div>
  );
}
