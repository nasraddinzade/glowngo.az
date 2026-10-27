import { LinkButton } from "@/components/Buttons";
import { PageTitle } from "@/components/Section";
import { az } from "@/i18n/az";

export default function NotFound() {
  return (
    <>
      <PageTitle title="Bu səhifə burada deyil" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <LinkButton href="/shop">{az.wishlist.toShop}</LinkButton>
      </div>
    </>
  );
}
