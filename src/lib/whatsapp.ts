import { WHATSAPP_PHONE } from "@/config";
import type { Product } from "@/data/products";

export const waLink = (text: string) => `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;

export const productTitle = (p: Product) => `${p.brand} ${p.name}`;

export const askPriceText = (p: Product) =>
  `Salam! Bu məhsulun qiymətini öyrənmək istəyirəm: ${productTitle(p)}`;

export const ROUTINE_TEXT = "Salam! Dəri tipimə uyğun rutin seçmək istəyirəm.";

export const giftCardTitle = (value: number) => `Hədiyyə kartı ${value} ₼`;

export const orderText = (lines: string[]) =>
  ["Salam! Glow saytından sifariş vermək istəyirəm:", ...lines].join("\n");

export const productLine = (p: Product, qty: number) =>
  `${productTitle(p)}${p.volume ? ` (${p.volume})` : ""} × ${qty}`;
