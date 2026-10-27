import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToList } from "@/components/AddToList";
import { WhatsAppButton } from "@/components/Buttons";
import { ProductGrid } from "@/components/ProductCard";
import { StepSticker } from "@/components/StepSticker";
import { getProduct, getStep, productImage, productsOfBrand, slugify, visibleProducts } from "@/data/catalog";
import { askPriceText } from "@/lib/whatsapp";
import { az } from "@/i18n/az";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return visibleProducts.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProduct((await params).id);
  return p ? { title: `${p.brand} ${p.name}`, description: p.description } : {};
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();
  const step = getStep(product.category)!;
  const brandSlug = slugify(product.brand);
  const more = productsOfBrand(brandSlug).filter((p) => p.id !== product.id);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 sm:pt-10">
      <Link href="/shop" className="text-sm font-semibold underline underline-offset-4">
        ← {az.product.back}
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-12">
        <div className="relative rounded-[2rem] bg-white p-3">
          <Image
            src={productImage(product)}
            alt={`${product.brand} ${product.name}`}
            width={800}
            height={800}
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-square w-full rounded-[1.5rem] object-contain"
          />
          <Link href={`/step/${step.slug}`} className="absolute left-5 top-5">
            <StepSticker number={step.number} className="w-14 text-xl transition hover:-rotate-12" />
          </Link>
          {product.restocked && (
            <span className="absolute right-5 top-5 rotate-3 rounded-full bg-blush px-3 py-1.5 text-sm font-semibold">
              {az.product.restocked}
            </span>
          )}
        </div>

        <div className="flex flex-col md:py-6">
          <Link href={`/brands/${brandSlug}`} lang="en" className="text-sm font-semibold uppercase tracking-[0.14em] hover:underline">
            {product.brand}
          </Link>
          <h1 className="display mt-3 text-[clamp(2.25rem,7vw,4rem)] break-words">{product.name}</h1>

          <div className="mt-5 flex flex-wrap gap-2 text-sm font-semibold">
            <Link href={`/step/${step.slug}`} className="rounded-full bg-salad px-3 py-1.5">
              {step.number} {step.title}
            </Link>
            {product.volume && (
              <span className="rounded-full bg-white px-3 py-1.5">
                {az.product.volume}: {product.volume}
              </span>
            )}
          </div>

          <p className="mt-6 text-lg leading-relaxed">{product.description}</p>

          <p className="display mt-8 text-3xl">{az.product.ask}</p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <AddToList item={{ kind: "product", id: product.id }} variant="ink" />
            <WhatsAppButton text={askPriceText(product)} variant="outline">
              {az.product.askWhatsapp}
            </WhatsAppButton>
          </div>
        </div>
      </div>

      {more.length > 0 && (
        <section className="pt-20">
          <h2 className="display mb-8 text-[clamp(2rem,7vw,3.5rem)]">
            {az.product.moreFromBrand} <span lang="en" className="uppercase">{product.brand}</span>
          </h2>
          <ProductGrid products={more} />
        </section>
      )}
    </div>
  );
}
