import type { Review, ReviewRow } from "./review.types";

export const mapReview = (row: ReviewRow): Review => ({
  id: row.id,
  author: {
    name: row.authorName,
    post: row.authorPost,
  },
  desc: row.desc,
  targetType: row.targetType,
  targetId: row.targetId
});
