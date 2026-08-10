import { ProgramIconKey } from "../lib/icon-map";
import type { ProgramFormData } from "./program.queries";
import type { ProgramItem, ProgramModule, ProgramRow } from "./program.types";

export const mapProgram = (row: ProgramRow): ProgramItem => {
  return {
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
    order: row.order,
  };
};

export const mapFormToDb = (formData: ProgramFormData) => ({
  id: formData.id,
  name: formData.name,
  description: formData.description,
  sessions: formData.sessions,
  months: formData.months,
  price: formData.price,
  currency: formData.currency,
  icon: formData.icon,
  targetAudience: formData.targetAudience.map((item) => item.value),
  benefits: formData.benefits.map((item) => item.value),

  includes: formData.includes.map((item) => item.value),
  curriculum: formData.curriculum,
  seoTitle: formData.seoTitle,
  seoDescription: formData.seoDescription,
  seoImage: formData.seoImage,
  seoKeywords: formData.seoKeywords.map((item) => item.value),
});
