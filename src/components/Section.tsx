export function Section({
  id,
  title,
  lead,
  aside,
  children,
  className = "",
}: {
  id?: string;
  title: string;
  lead?: string;
  aside?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-7xl scroll-mt-6 px-4 pt-20 sm:px-6 sm:pt-28 ${className}`}>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
        <div className="max-w-2xl">
          <h2 className="display text-[clamp(2.4rem,9vw,4.75rem)]">{title}</h2>
          {lead && <p className="mt-3 text-base text-ink/70 sm:text-lg">{lead}</p>}
        </div>
        {aside}
      </div>
      {children}
    </section>
  );
}

export function PageTitle({ title, lead, children }: { title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:px-6 sm:pt-16">
      {children}
      <h1 className="display text-[clamp(2.75rem,12vw,6rem)] break-words">{title}</h1>
      {lead && <p className="mt-4 max-w-2xl text-base text-ink/70 sm:text-lg">{lead}</p>}
    </div>
  );
}
