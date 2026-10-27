// Step number in a salad circle, like a sticker on the shop shelf.
export function StepSticker({ number, className = "" }: { number: string; className?: string }) {
  return (
    <span
      className={`display inline-flex aspect-square shrink-0 items-center justify-center rounded-full bg-salad text-ink tracking-[-0.03em] ${className}`}
    >
      {number}
    </span>
  );
}
