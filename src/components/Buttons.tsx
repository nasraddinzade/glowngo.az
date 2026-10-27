import Link from "next/link";
import { WhatsAppIcon } from "./Icons";
import { waLink } from "@/lib/whatsapp";

const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 text-[15px] font-semibold transition active:scale-[0.98]";

export const btn = {
  ink: `${base} bg-ink text-bone hover:bg-ink/85`,
  outline: `${base} border-2 border-ink text-ink hover:bg-ink hover:text-bone`,
  salad: `${base} bg-salad text-ink hover:bg-salad-deep`,
  white: `${base} bg-white text-ink hover:bg-bone`,
};

export function WhatsAppButton({
  text,
  children,
  variant = "ink",
  className = "",
}: {
  text: string;
  children: React.ReactNode;
  variant?: keyof typeof btn;
  className?: string;
}) {
  return (
    <a href={waLink(text)} target="_blank" rel="noopener noreferrer" className={`${btn[variant]} ${className}`}>
      <WhatsAppIcon />
      {children}
    </a>
  );
}

export function LinkButton({
  href,
  children,
  variant = "ink",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof btn;
  className?: string;
}) {
  return (
    <Link href={href} className={`${btn[variant]} ${className}`}>
      {children}
    </Link>
  );
}
