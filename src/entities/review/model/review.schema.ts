import { z } from "zod";

export const reviewSchema = z.object({
  authorName: z.string().min(1, "Обязательное поле"),
  authorPost: z.string().min(1, "Обязательное поле"),
  desc: z.array(z.string().min(1)).min(1, "Добавьте хотя бы один отзыв"),
  targetType: z.enum(["program", "course"]),
  targetId: z.string().min(1, "Выберите программу"),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;
export type ReviewFormInput = z.input<typeof reviewSchema>;
