import { Button } from "@/shared/ui";
import type { Review } from "../../model/review.types";

import scss from "./ReviewCard.module.scss";

interface ReviewCardProps {
  review: Review;
  variant?: "default" | "admin";
  targetName?: string;
  onDelete?: (id: string) => void;

  deleteStatus?: {
    isPending: boolean;
    id?: string;
  };
}

export const ReviewCard = ({
  review,
  variant = "default",
  targetName,
  onDelete,
  deleteStatus,
}: ReviewCardProps) => {
  const { author, desc, id } = review;

  const firstLetter = author.name.charAt(0).toUpperCase();

  const isDeleting = deleteStatus?.isPending && deleteStatus.id === id;

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

      {variant === "admin" ? (
        <div className={scss["review-card__footer"]}>
          {/* <div className={scss["review-card__block"]}>
            <p className="p2 primary-color-100">{targetName}</p>
          </div> */}

          <div className={scss["review-card__btns"]}>
            <Button
              theme="primary"
              // iconLeft={<Pencil />}
              iconSize="medium"
              size="ghost"
              as="link"
              to={`/admin/reviews/edit/${id}`}
            >
              <p className="p3">Редактировать</p>
            </Button>

            <Button
              theme="remove"
              // iconLeft={<Pencil />}
              iconSize="medium"
              size="ghost"
              onClick={() => {
                onDelete?.(id);
              }}
              disabled={isDeleting}
            >
              <p className="p3">{isDeleting ? "Удаляем..." : "Удалить"}</p>
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
