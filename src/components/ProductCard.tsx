import Image from "next/image";
import Link from "next/link";
import { StepSticker } from "./StepSticker";
import { getStep, productHref, productImage } from "@/data/catalog";
import type { Product } from "@/data/products";
import { az } from "@/i18n/az";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const step = getStep(product.category)!;
  return (
    <Link
      href={productHref(product)}
      className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] bg-white p-2 transition hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(21,23,19,0.45)]"
    >
      <div className="relative aspect-square overflow-hidden rounded-[1.35rem] bg-white">
        <Image
          src={productImage(product)}
          alt={`${product.brand} ${product.name}`}
          width={800}
          height={800}
          priority={priority}
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className="h-full w-full object-contain transition duration-500 group-hover:scale-[1.03]"
        />
        <StepSticker number={step.number} className="absolute left-2 top-2 w-10 text-[15px] sm:w-12 sm:text-lg" />
        {product.restocked && (
          <span className="absolute bottom-2 left-2 -rotate-3 rounded-full bg-blush px-2.5 py-1 text-[11px] font-semibold sm:text-xs">
            {az.product.restocked}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-2 pb-3 pt-3 sm:px-3">
        <p lang="en" className="text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs">{product.brand}</p>
        <h3 className="display mt-1 text-[17px] leading-[1.05] tracking-[-0.03em] sm:text-xl">{product.name}</h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-snug text-ink/70 sm:text-sm">{product.description}</p>
        <p className="mt-auto pt-3 text-[13px] font-semibold underline decoration-salad decoration-[3px] underline-offset-4 sm:text-sm">
          {az.product.ask}
        </p>
      </div>
    </Link>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 lg:gap-8">
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < 4} />
      ))}
    </div>
  );
}
