import { useMutation, useQueryClient } from "@tanstack/react-query";

import { reviewApi } from "./review.api";
import { REVIEWS_QUERY_KEY } from "./useReviewsQuery";

import type { ReviewFormValues } from "@/entities/review/model/review.schema";

export const useCreateReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReviewFormValues) => reviewApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REVIEWS_QUERY_KEY });
    },
  });
};

export const useUpdateReview = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReviewFormValues) => reviewApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REVIEWS_QUERY_KEY });
    },
  });
};

export const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => reviewApi.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REVIEWS_QUERY_KEY });
    },
  });
};
