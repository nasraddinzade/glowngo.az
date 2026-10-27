"use client";

import Link from "next/link";
import { btn } from "./Buttons";
import { HeartIcon } from "./Icons";
import { itemKey, useWishlist, type WishInput } from "@/lib/wishlist";
import { az } from "@/i18n/az";

export function AddToList({
  item,
  variant = "outline",
  className = "",
}: {
  item: WishInput;
  variant?: keyof typeof btn;
  className?: string;
}) {
  const { add, has, ready } = useWishlist();
  const inList = ready && has(itemKey(item));

  if (inList) {
    return (
      <Link href="/istedikerim" className={`${btn.salad} ${className}`}>
        <HeartIcon filled />
        {az.product.added}
      </Link>
    );
  }
  return (
    <button type="button" onClick={() => add(item)} className={`${btn[variant]} ${className}`}>
      <HeartIcon />
      {az.product.add}
    </button>
  );
}
