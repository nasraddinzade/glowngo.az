import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Catalog } from "@/components/Catalog";
import { PageTitle } from "@/components/Section";
import { StepSticker } from "@/components/StepSticker";
import { getStep, visibleSteps } from "@/data/catalog";
import { az } from "@/i18n/az";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return visibleSteps.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const step = getStep((await params).slug);
  return { title: step ? `${step.number} ${step.title}` : az.shop.title };
}

export default async function StepPage({ params }: Props) {
  const { slug } = await params;
  const step = visibleSteps.find((s) => s.slug === slug);
  if (!step) notFound();

  return (
    <>
      <PageTitle title={step.title} lead={az.shop.lead}>
        <p className="mb-4 flex items-center gap-3 text-sm font-semibold">
          <StepSticker number={step.number} className="w-12 text-lg" />
          {az.step} {step.number}
        </p>
      </PageTitle>
      <Catalog initialStep={step.slug} />
    </>
  );
}
