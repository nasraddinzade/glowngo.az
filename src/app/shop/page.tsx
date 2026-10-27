import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";
import { PageTitle } from "@/components/Section";
import { az } from "@/i18n/az";

export const metadata: Metadata = { title: az.shop.title };

export default function ShopPage() {
  return (
    <>
      <PageTitle title={az.shop.title} lead={az.shop.lead} />
      <Catalog />
    </>
  );
}
