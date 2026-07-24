import { apiClient } from "@/shared/api/client";

import type { ReviewFormValues } from "@/entities/review/model/review.schema";

import type { Review, ReviewRow } from "@/entities/review/model/review.types";
import { mapReview } from "@/entities/review/model/review.mapper";
import type { TargetType } from "@/shared/types/reviewable.types";

export type ReviewRecord = ReviewFormValues & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export const reviewApi = {
  list: async (): Promise<Review[]> => {
    const { data } = await apiClient.get<ReviewRow[]>("/admin/reviews");

    return data.map(mapReview);
  },
  get: async (id: string): Promise<Review> => {
    const { data } = await apiClient.get<ReviewRow>(`/admin/reviews/${id}`);
    return mapReview(data);
  },

  getByTarget: async (
    targetType: TargetType,
    targetId: string
  ): Promise<Review[]> => {
    const { data } = await apiClient.get("/admin/reviews", {
      params: {
        targetType,
        targetId,
      },
    });

    return data.map(mapReview);
  },

  create: (data: ReviewFormValues) =>
    apiClient.post<ReviewRecord>("/admin/reviews", data),
  update: (id: string, data: ReviewFormValues) =>
    apiClient.patch<ReviewRecord>(`/admin/reviews/${id}`, data),
  remove: (id: string) =>
    apiClient.delete<{ ok: true }>(`/admin/reviews/${id}`),
};
