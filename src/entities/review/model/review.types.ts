import type { TargetType } from "@/shared/types";

export interface Review {
  id: string;
  author: ReviewAuthor;
  desc: string[];
  targetType: TargetType;
}

export type ReviewAuthor = {
  name: string;
  post: string;
};