import { useQuery } from "@tanstack/react-query";

import { reviewApi } from "./review.api";
import type { TargetType } from "@/shared/types/reviewable.types";

export const REVIEWS_QUERY_KEY = ["admin", "reviews"] as const;

export const useReviewsQuery = () =>
  useQuery({
    queryKey: REVIEWS_QUERY_KEY,
    queryFn: reviewApi.list,
  });

export const useReviewQuery = (id: string | undefined) =>
  useQuery({
    queryKey: [...REVIEWS_QUERY_KEY, id],
    queryFn: () => reviewApi.get(id as string),
    enabled: Boolean(id),
  });

export const useReviewsByTargetQuery = (
  targetType: TargetType | undefined,
  targetId: string | undefined
) =>
  useQuery({
    queryKey: [...REVIEWS_QUERY_KEY, targetType, targetId],
    queryFn: () =>
      reviewApi.getByTarget(targetType as TargetType, targetId as string),
    enabled: Boolean(targetType && targetId),
  });
