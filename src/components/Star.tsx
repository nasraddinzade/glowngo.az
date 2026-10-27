// Four-point star from the Glow logo.
export function Star({ className = "", title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden={title ? undefined : true} role={title ? "img" : undefined}>
      {title && <title>{title}</title>}
      <path
        fill="currentColor"
        d="M12 0c.6 6.4 2.6 10.4 12 12-9.4 1.6-11.4 5.6-12 12-.6-6.4-2.6-10.4-12-12C9.4 10.4 11.4 6.4 12 0Z"
      />
    </svg>
  );
}
