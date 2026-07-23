import { prisma } from "@/shared/lib/prisma";

import type { ProgramItem, ProgramModule } from "./program.types";
import type { ProgramIconKey } from "../lib/icon-map";

import { ProgramFormValues } from "./program.schema";
import { Prisma } from "@prisma/client";

type ProgramRow = Prisma.ProgramGetPayload<{}>;

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

export type ProgramFormData = ProgramFormValues;

export const mapFormToDb = (formData: ProgramFormData) => ({
  id: formData.id,
  name: formData.name,
  description: formData.description,
  sessions: formData.sessions,
  months: formData.months,
  price: formData.price,
  currency: formData.currency,
  icon: formData.icon,
  targetAudience: formData.targetAudience.map(
    item => item.value
  ),
  benefits: formData.benefits.map(
    item => item.value
  ),

  includes: formData.includes.map(
    item => item.value
  ),
  curriculum: formData.curriculum,
  seoTitle: formData.seoTitle,
  seoDescription: formData.seoDescription,
  seoImage: formData.seoImage,
  seoKeywords: formData.seoKeywords.map(
    item => item.value
  ),
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
