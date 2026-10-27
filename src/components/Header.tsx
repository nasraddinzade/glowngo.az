"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { HeartIcon } from "./Icons";
import { useWishlist } from "@/lib/wishlist";
import { az } from "@/i18n/az";

const links = [
  { href: "/shop", label: az.nav.shop },
  { href: "/#brendler", label: az.nav.brands },
  { href: "/magazalar", label: az.nav.stores },
];

export function Header() {
  const pathname = usePathname();
  const { count, ready } = useWishlist();
  // On the home page the header sits on the salad hero.
  const onHero = pathname === "/";

  return (
    <header className={onHero ? "bg-salad" : "bg-bone"}>
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        <Link href="/" aria-label={az.nav.home} className="shrink-0">
          <Logo size={52} />
        </Link>

        <nav className="ml-auto flex min-w-0 items-center gap-1 sm:gap-2">
          {links.map((l) => {
            const active = l.href === pathname;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-3 py-2 text-[14px] font-semibold transition sm:px-4 sm:text-[15px] ${
                  active ? "bg-ink text-bone" : "hover:bg-ink/10"
                } ${l.href === "/#brendler" ? "hidden sm:inline-flex" : ""}`}
              >
                {l.label}
              </Link>
            );
          })}
          <Link
            href="/istedikerim"
            aria-label={az.nav.wishlist}
            className={`relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition ${
              pathname === "/istedikerim" ? "bg-ink text-bone" : onHero ? "bg-ink/10 hover:bg-ink/20" : "bg-white hover:bg-white/70"
            }`}
          >
            <HeartIcon filled={ready && count > 0} />
            {ready && count > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-blush px-1 text-[11px] font-semibold text-ink">
                {count}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}
