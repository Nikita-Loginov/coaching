import { z } from "zod";
import { PROGRAM_ICON_KEYS } from "../lib/icon-map";

export const programSchema = z.object({
  id: z
    .string()
    .min(1, "Обязательное поле")
    .regex(/^[a-z0-9-]+$/, "Только латиница в нижнем регистре, цифры и дефис"),
  name: z.string().min(1, "Обязательное поле"),
  description: z.string().min(1, "Обязательное поле"),
  sessions: z.number().int().positive("Должно быть больше 0"),
  months: z.number().int().positive("Должно быть больше 0"),
  price: z.string().min(1, "Обязательное поле"),
  currency: z.enum(["rub", "eu"]),
  icon: z.enum(PROGRAM_ICON_KEYS),
  targetAudience: z.array(
    z.object({
      value: z.string(),
    })
  ).default([]),
  benefits: z.array(
    z.object({
      value: z.string(),
    })
  ).default([]),
  includes: z.array(
    z.object({
      value: z.string(),
    })
  ).default([]),
  curriculum: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ).default([]),
  seoTitle: z.string().min(1, "Обязательное поле"),
  seoDescription: z.string().min(1, "Обязательное поле"),
  seoImage: z.string().optional().default(""),
  seoKeywords: z.array(
    z.object({
      value: z.string(),
    })
  ),
});

export type ProgramFormValues = z.infer<typeof programSchema>;
export type ProgramFormInput = z.input<typeof programSchema>;

export const programUpdateSchema = programSchema.omit({ id: true });
export type ProgramUpdateValues = z.infer<typeof programUpdateSchema>;
