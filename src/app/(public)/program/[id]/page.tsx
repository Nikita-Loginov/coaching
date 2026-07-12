import Script from "next/script";
import { notFound } from "next/navigation";

import { ProgramDetailPage } from "@/pages/program-detail";

import { getProgramById } from "@/entities/program/model/program.queries";

import { createProgramSchema } from "@/shared/config/seo";
import { Metadata } from "next";

type Params = {
  id: string;
};

type PageProps = {
  params: Promise<Params>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const program = await getProgramById(id);

  if (!program) {
    notFound();
  }

  return {
    title: program.seo.title,
    description: program.seo.description,

    keywords: program.seo.keywords,

    alternates: {
      canonical: `/program/${id}`,
    },

    openGraph: {
      title: program.seo.title,
      description: program.seo.description,
      images: [program.seo.image],
    },

    twitter: {
      card: "summary_large_image",
      title: program.seo.title,
      description: program.seo.description,
      images: [program.seo.image],
    },
  };
}

export default async function ProgramDetali({ params }: PageProps) {
  const { id } = await params;

  const program = await getProgramById(id);

  if (!program) return null;

  return (
    <>
      <ProgramDetailPage idProgram={id} />

      <Script
        id={`project-schema-${id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(createProgramSchema(program)),
        }}
      />
    </>
  );
}
