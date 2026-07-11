import type { Review } from "../../model/review.types";

import scss from "./ReviewCard.module.scss";

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review: { author, desc } }: ReviewCardProps) => {
  const firstLetter = author.name.charAt(0).toUpperCase();

  return (
    <div className={scss["review-card"]}>
      <div className={scss["review-card__top"]}>
        <div className={scss["review-card__icon"]}>{firstLetter}</div>

        <div className={scss["review-card__block"]}>
          <p className="p2">{author.name}</p>

          <p className="p3 primary-color-100">{author.post}</p>
        </div>
      </div>

      <div className={scss["review-card__content"]}>
        {desc.length > 0 ? (
          <>
            
            <div className={scss["review-card__textbox"]}>
              {desc.map((text, index) => (
                <p key={index} className={"p2"}>
                  «{text}»
                </p>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
