import { z } from "zod";

export const teamSchema = z.object({
  id: z
    .string()
    .min(1, "Обязательное поле")
    .regex(/^[a-z0-9-]+$/, "Только латиница в нижнем регистре, цифры и дефис"),
  name: z.string().min(1, "Обязательное поле"),
  middlename: z.string().min(1, "Обязательное поле"),
  post: z.string().min(1, "Обязательное поле"),
  img: z.string().min(1, "Обязательное поле"),
  city: z.string().optional().or(z.literal("")),
  info: z.array(z.string().min(1)).min(1, "Добавьте хотя бы один пункт"),
  specializing: z
    .array(z.string().min(1))
    .min(1, "Добавьте хотя бы один пункт"),
  certification: z
    .array(z.string().min(1))
    .min(1, "Добавьте хотя бы один пункт"),
  principle: z.string().min(1, "Обязательное поле"),
  telegram: z.string().optional().or(z.literal("")),
  vk: z.string().optional().or(z.literal("")),
});

export type TeamFormValues = z.infer<typeof teamSchema>;
export type TeamFormInput = z.input<typeof teamSchema>;

export const teamUpdateSchema = teamSchema.omit({ id: true });

export type TeamUpdateValues = z.infer<typeof teamUpdateSchema>;
