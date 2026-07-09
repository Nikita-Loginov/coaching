import { Container, TopInner } from "@/shared/ui";

import { ReviewCard } from "@/entities/review/ui";

import { REVIEWS_ITEMS } from "@/shared/config/reviews/reviews-items.config";

import type { TargetType } from "@/shared/types";

import scss from "./ReviewsSection.module.scss";

interface ReviewsSectionProps {
  title?: string;
  desc?: string[];
  targetType?: TargetType;
}

export const ReviewsSection = ({
  title = "Отзывы",
  desc = [],
  targetType,
}: ReviewsSectionProps) => {
  const reviews = REVIEWS_ITEMS.filter(
    (review) => review.targetType === targetType
  );

  if (reviews.length < 1) return;

  return (
    <section className={scss["reviews"]}>
      <Container>
        <TopInner title={title} desc={desc}>
          <div className={scss["reviews__items"]}>
            {reviews.map((review) => {
              return <ReviewCard review={review} key={review.id} />;
            })}
          </div>
        </TopInner>
      </Container>
    </section>
  );
};
