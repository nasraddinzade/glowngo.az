import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageTitle } from "@/components/Section";
import { ProductGrid } from "@/components/ProductCard";
import { brands, getBrand, productsOfBrand } from "@/data/catalog";
import { az } from "@/i18n/az";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return { title: getBrand((await params).slug)?.name };
}

export default async function BrandPage({ params }: Props) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  return (
    <>
      <PageTitle title={brand.name.toUpperCase()} lead={az.brand.lead} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <ProductGrid products={productsOfBrand(slug)} />

        <h2 className="mt-16 text-sm font-semibold">{az.brand.all}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {brands.map((b) => (
            <Link
              key={b.slug}
              href={`/brands/${b.slug}`}
              lang="en"
              className={`rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.06em] ${
                b.slug === slug ? "bg-ink text-bone" : "bg-white hover:bg-ink/10"
              }`}
            >
              {b.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
