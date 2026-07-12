import { z } from "zod";

import { PROGRAM_ICON_KEYS } from "../lib/icon-map";

export const programSchema = z.object({
  id: z
    .string()
    .min(1, "Обязательное поле")
    .regex(/^[a-z0-9-]+$/, "Только латиница в нижнем регистре, цифры и дефис"),
  name: z.string().min(1, "Обязательное поле"),
  description: z.string().min(1, "Обязательное поле"),
  sessions: z.number("Введите число").int().positive("Должно быть больше 0"),
  months: z.number("Введите число").int().positive("Должно быть больше 0"),
  price: z.string().min(1, "Обязательное поле"),
  currency: z.enum(["rub", "eu"]),
  icon: z.enum(PROGRAM_ICON_KEYS),
  targetAudience: z.array(z.string().min(1)).min(1, "Добавьте хотя бы один пункт"),
  benefits: z.array(z.string().min(1)).min(1, "Добавьте хотя бы один пункт"),
  includes: z.array(z.string().min(1)).min(1, "Добавьте хотя бы один пункт"),
  curriculum: z
    .array(
      z.object({
        title: z.string().min(1, "Обязательное поле"),
        description: z.string().min(1, "Обязательное поле"),
      })
    )
    .min(1, "Добавьте хотя бы один модуль"),
  seoTitle: z.string().min(1, "Обязательное поле"),
  seoDescription: z.string().min(1, "Обязательное поле"),
  seoImage: z.string().min(1, "Обязательное поле"),
  seoKeywords: z.array(z.string().min(1)),
});

export type ProgramFormValues = z.infer<typeof programSchema>;

export const programUpdateSchema = programSchema.omit({ id: true });

export type ProgramUpdateValues = z.infer<typeof programUpdateSchema>;
