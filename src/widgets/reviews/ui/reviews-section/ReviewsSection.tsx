import { Container, TopInner, Swiper } from "@/shared/ui";

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

  const reviewsItems = reviews.map((review) => {
      return <ReviewCard key={review.id} review={review} />;
    });

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

          {/* <Swiper
            config={{
              spaceBetween: 24,
              slidesPerView: 3,
              // breakpoints: {
              //   1023: {
              //     slidesPerView: 3.5,
              //     spaceBetween: 32,
              //   },
              //   767: {
              //     slidesPerView: 2.5,
              //   },
              //   600: {
              //     slidesPerView: 1.5,
              //   }
              // }
            }}
            items={reviewsItems}
            pagination
          ></Swiper> */}
        </TopInner>
      </Container>
    </section>
  );
};
