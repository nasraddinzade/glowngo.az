export type StepSlug =
  | "toner-pad"
  | "serum-esens"
  | "krem-spf"
  | "maska-cihaz"
  | "makiyaj"
  | "sac";

export type Step = {
  slug: StepSlug;
  number: string;
  title: string;
};

// Step 01 Təmizləmə is intentionally absent: no confirmed products yet.
// TODO(owner): which cleansers should go here?
export const steps: Step[] = [
  { slug: "toner-pad", number: "02", title: "Toner & Pad" },
  { slug: "serum-esens", number: "03", title: "Serum & Esens" },
  { slug: "krem-spf", number: "04", title: "Krem & SPF" },
  { slug: "maska-cihaz", number: "05", title: "Maska & Cihaz" },
  { slug: "makiyaj", number: "06", title: "Makiyaj" },
  { slug: "sac", number: "07", title: "Saç" },
];

export type Product = {
  id: string;
  brand: string;
  name: string;
  /** null when not confirmed; never rendered then */
  volume: string | null;
  category: StepSlug;
  description: string;
  restocked: boolean;
  noImage: boolean;
};

export const products: Product[] = [
  {
    id: "medicube-one-day-exosome-shot-pore-ampoule-7500",
    brand: "Medicube",
    name: "One Day Exosome Shot Pore Ampoule 7500",
    volume: "30 ml",
    category: "serum-esens",
    description: "Məsamələr üçün ekzosomlu ampula.",
    restocked: false,
    noImage: false,
  },
  {
    // TODO(owner): confirm exact SKU name
    id: "medicube-pdrn-pink-collagen-exosome-shot-serum-2000",
    brand: "Medicube",
    name: "PDRN Pink Collagen Exosome Shot Serum 2000",
    volume: "30 ml",
    category: "serum-esens",
    description: "PDRN və kollagenli çəhrayı zərdab.",
    restocked: true,
    noImage: false,
  },
  {
    id: "medicube-collagen-night-wrapping-mask",
    brand: "Medicube",
    name: "Collagen Night Wrapping Mask",
    volume: null,
    category: "maska-cihaz",
    description: "Gecə boyu işləyən kollagenli maska.",
    restocked: false,
    noImage: false,
  },
  {
    id: "medicube-age-r-booster-pro-pink",
    brand: "Medicube",
    name: "Age-R Booster Pro Pink",
    volume: null,
    category: "maska-cihaz",
    description: "Üz dərisinə qulluq cihazı, çəhrayı.",
    restocked: true,
    noImage: false,
  },
  {
    id: "anua-10-azelaic-acid-hyaluron-serum",
    brand: "Anua",
    name: "10% Azelaic Acid + Hyaluron Serum",
    volume: "30 ml",
    category: "serum-esens",
    description: "Azelaik turşusu və hialuronlu zərdab.",
    restocked: false,
    noImage: false,
  },
  {
    id: "anua-pdrn-hyaluronic-acid-capsule-hydrating-mist",
    brand: "Anua",
    name: "PDRN Hyaluronic Acid Capsule Hydrating Mist",
    volume: null,
    category: "serum-esens",
    description: "Kapsullu nəmləndirici mist.",
    restocked: false,
    noImage: false,
  },
  {
    id: "anua-invisible-glow-finish-sunscreen-stick",
    brand: "Anua",
    name: "Invisible Glow Finish Sunscreen Stick",
    volume: null,
    category: "krem-spf",
    description: "Makiyaj üstündən də yeniləmək olan stick günəş kremi.",
    restocked: false,
    noImage: false,
  },
  {
    id: "numbuzin-no9-nad-bio-lifting-essence",
    brand: "Numbuzin",
    name: "No.9 NAD+ Bio Lifting Essence",
    volume: "50 ml",
    category: "serum-esens",
    description: "NAD+ tərkibli liftinq essensiyası.",
    restocked: false,
    noImage: false,
  },
  {
    id: "purito-seoul-bb-cream",
    brand: "Purito Seoul",
    name: "BB Cream",
    volume: null,
    category: "makiyaj",
    description: "Üz üçün BB krem.",
    restocked: false,
    noImage: false,
  },
  {
    id: "mediheal-madecassoside-pad",
    brand: "Mediheal",
    name: "Madecassoside Pad",
    volume: null,
    category: "toner-pad",
    description: "Centella və madecassoside tərkibli toner pad.",
    restocked: false,
    noImage: false,
  },
  {
    id: "clio-kill-cover-founwear-cushion",
    brand: "Clio",
    name: "Kill Cover Founwear Cushion",
    volume: null,
    category: "makiyaj",
    description: "Natural satin bitişli, orta qapadıcılıqlı kuşon.",
    restocked: false,
    noImage: false,
  },
  {
    // TODO(owner): confirm model, probably Mask Fit
    id: "tirtir-cushion",
    brand: "TIRTIR",
    name: "Cushion",
    volume: null,
    category: "makiyaj",
    description: "Parlaq bitişli kuşon.",
    restocked: false,
    noImage: false,
  },
  {
    id: "romand-juicy-lasting-tint",
    brand: "rom&nd",
    name: "Juicy Lasting Tint",
    volume: null,
    category: "makiyaj",
    description: "Dodaq tinti.",
    restocked: false,
    noImage: false,
  },
  {
    id: "aromatica-rosemary-root-enhancer",
    brand: "Aromatica",
    name: "Rosemary Root Enhancer",
    volume: null,
    category: "sac",
    description: "Saç dibi üçün rozmarin spreyi.",
    restocked: false,
    noImage: false,
  },
  {
    id: "aromatica-rosemary-scalp-scrub-shampoo",
    brand: "Aromatica",
    name: "Rosemary Scalp Scrub Shampoo",
    volume: null,
    category: "sac",
    description: "Rozmarinli şampun və baş dərisi skrabı.",
    restocked: false,
    noImage: false,
  },
];
