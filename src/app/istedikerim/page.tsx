import type { Metadata } from "next";
import { PageTitle } from "@/components/Section";
import { WishlistView } from "./WishlistView";
import { az } from "@/i18n/az";

export const metadata: Metadata = { title: az.wishlist.title };

export default function WishlistPage() {
  return (
    <>
      <PageTitle title={az.wishlist.title} lead={az.wishlist.lead} />
      <WishlistView />
    </>
  );
}
