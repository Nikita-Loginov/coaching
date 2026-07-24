import { prisma } from "@/shared/lib/prisma";

import type { Review } from "./review.types";
import type { TargetType } from "@/shared/types";
import type { ReviewRow } from "./review.types";

import { mapReview } from "./review.mapper";

export const getReviews = async (): Promise<Review[]> => {
  const rows = await prisma.review.findMany({ orderBy: { createdAt: "asc" } });

  return rows.map(mapReview);
};

export const getReviewsByTargetType = async (
  targetType: TargetType
): Promise<Review[]> => {
  const rows = await prisma.review.findMany({
    where: { targetType },
    orderBy: { createdAt: "asc" },
  });

  return rows.map(mapReview);
};

export const getReviewsByTarget = async (
  targetType: TargetType,
  targetId: string
): Promise<Review[]> => {
  const rows = await prisma.review.findMany({
    where: {
      targetType,
      targetId,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return rows.map(mapReview);
};

export const getReviewById = async (id: string): Promise<Review | null> => {
  const row = await prisma.review.findUnique({ where: { id } });

  return row ? mapReview(row) : null;
};
