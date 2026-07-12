import { prisma } from "@/shared/lib/prisma";

import type { ProgramItem, ProgramModule } from "./program.types";
import type { ProgramIconKey } from "../lib/icon-map";

import type { Program as ProgramRow } from "@prisma/client";

export const mapProgram = (row: ProgramRow): ProgramItem => ({
  id: row.id,
  name: row.name,
  description: row.description,
  duration: {
    sessions: row.sessions,
    months: row.months,
  },
  price: row.price,
  currency: row.currency,
  icon: row.icon as ProgramIconKey,
  targetAudience: row.targetAudience,
  benefits: row.benefits,
  includes: row.includes,
  curriculum: row.curriculum as unknown as ProgramModule[],
  seo: {
    title: row.seoTitle,
    description: row.seoDescription,
    image: row.seoImage,
    keywords: row.seoKeywords,
  },
});

export type ProgramFormData = Omit<
  ProgramItem,
  "id" | "createdAt" | "updatedAt"
>;

export const mapFormToDb = (formData: ProgramFormData) => ({
  name: formData.name,
  description: formData.description,
  sessions: formData.duration.sessions,
  months: formData.duration.months,
  price: formData.price,
  currency: formData.currency,
  icon: formData.icon,
  targetAudience: formData.targetAudience,
  benefits: formData.benefits,
  includes: formData.includes,
  curriculum: formData.curriculum,
  seoTitle: formData.seo.title,
  seoDescription: formData.seo.description,
  seoImage: formData.seo.image,
  seoKeywords: formData.seo.keywords,
});

export const getPrograms = async (): Promise<ProgramItem[]> => {
  const rows = await prisma.program.findMany({ orderBy: { createdAt: "asc" } });

  return rows.map(mapProgram);
};

export const getProgramById = async (
  id: string
): Promise<ProgramItem | null> => {
  const row = await prisma.program.findUnique({ where: { id } });

  return row ? mapProgram(row) : null;
};
