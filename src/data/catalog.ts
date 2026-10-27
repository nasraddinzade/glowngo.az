import { products, steps, type Product, type Step, type StepSlug } from "./products";

const stepOrder = new Map(steps.map((s, i) => [s.slug, i]));

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/** Only products with a real photo ever reach the site. Ordered by routine step. */
export const visibleProducts: Product[] = products
  .filter((p) => !p.noImage)
  .sort((a, b) => stepOrder.get(a.category)! - stepOrder.get(b.category)!);

/** Steps that have at least one visible product. */
export const visibleSteps: Step[] = steps.filter((s) => visibleProducts.some((p) => p.category === s.slug));

export type Brand = { slug: string; name: string };

export const brands: Brand[] = [...new Set(visibleProducts.map((p) => p.brand))].map((name) => ({
  slug: slugify(name),
  name,
}));

export const getStep = (slug: StepSlug | string) => steps.find((s) => s.slug === slug);
export const getBrand = (slug: string) => brands.find((b) => b.slug === slug);
export const getProduct = (id: string) => visibleProducts.find((p) => p.id === id);
export const productsOfStep = (slug: string) => visibleProducts.filter((p) => p.category === slug);
export const productsOfBrand = (slug: string) => visibleProducts.filter((p) => slugify(p.brand) === slug);

export const productImage = (p: Product) => `/products/${p.id}.webp`;
export const productHref = (p: Product) => `/mehsul/${p.id}`;
