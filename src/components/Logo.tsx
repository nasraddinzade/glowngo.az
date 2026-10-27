import { Star } from "./Star";

// Code version of the logo: salad circle, black lowercase "glow", the "o" is a black disc
// with the star cut out of it.
// TODO(owner): replace with the official logo file.
export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`display inline-flex items-baseline leading-none tracking-[-0.06em] ${className}`}>
      gl
      <span className="relative mx-[0.02em] inline-block h-[0.56em] w-[0.56em] rounded-full bg-ink">
        <Star className="absolute inset-[0.1em] text-salad" />
      </span>
      w
    </span>
  );
}

export function Logo({ size = 48 }: { size?: number }) {
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full bg-salad text-ink"
      style={{ width: size, height: size, fontSize: size * 0.36 }}
    >
      <Wordmark className="-mt-[0.12em]" />
    </span>
  );
}
