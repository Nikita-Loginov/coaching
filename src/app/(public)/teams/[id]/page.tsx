import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { TeamDetailPage } from "@/shared/ui/pages/team-detail";
import { getTeamById } from "@/entities/team/model/team.queries";
import { SITE_CONFIG } from "@/shared/config/seo";

interface TeamDetailProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: TeamDetailProps): Promise<Metadata> {
  const { id } = await params;

  const team = await getTeamById(id);

  if (!team) {
    notFound();
  }

  const fullName = `${team.name} ${team.middlename}`.trim();

  const specialization = team.specializing
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 3)
    .join(", ");

  const description = [
    `${fullName} — ${team.post}.`,
    specialization ? `Специализация: ${specialization}.` : null,
    team.city ? `${team.city}.` : null,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    title: `${fullName} — ${team.post}`,

    description,

    keywords: [
      fullName,
      team.post,
      ...team.specializing.map((item) => item.trim()),
      ...team.certification.map((item) => item.trim()),
      ...(team.city ? [team.city] : []),
    ],

    alternates: {
      canonical: `/teams/${id}`,
    },

    openGraph: {
      title: `${fullName} — ${team.post}`,
      description,
      url: `/teams/${id}`,
      siteName: `Коучинг ${SITE_CONFIG.name}`,
      locale: SITE_CONFIG.locale,
      type: "profile",
      images: [
        {
          url: team.img,
          alt: fullName,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${fullName} — ${team.post}`,
      description,
      images: [team.img],
    },

    authors: [
      {
        name: fullName,
      },
    ],
  };
}

export default async function TeamDetail({ params }: TeamDetailProps) {
  const { id } = await params;

  const team = await getTeamById(id);

  if (!team) {
    notFound();
  }

  return <TeamDetailPage teamId={id} />;
}
