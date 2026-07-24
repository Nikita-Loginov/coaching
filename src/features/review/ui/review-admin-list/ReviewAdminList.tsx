"use client";

import { useState } from "react";
import classNames from "classnames";

import { ReviewCard } from "@/entities/review/ui";

import {
  useReviewsQuery,
  useReviewsByTargetQuery,
} from "../../model/useReviewsQuery";
import { useDeleteReview } from "../../model/useReviewMutations";
import { useProgramsQuery } from "@/features/program/model/useProgramsQuery";

import { Select } from "@/shared/ui";
import { AdminItems } from "@/shared/ui/pages/admin-page";

import scss from "./ReviewAdminList.module.scss";

const ALL_PROGRAMS = "all";

export const ReviewAdminList = () => {
  const [programId, setProgramId] = useState<string>(ALL_PROGRAMS);

  const deleteReview = useDeleteReview();

  const { data: programs, isLoading: isLoadingPrograms } = useProgramsQuery();

  const { data: allReviews, isLoading: isLoadingReviews } = useReviewsQuery();

  const { data: programReviews, isLoading: isLoadingProgramReviews } =
    useReviewsByTargetQuery(
      "program",
      programId === ALL_PROGRAMS ? undefined : programId
    );

  const reviews = programId === ALL_PROGRAMS ? allReviews : programReviews;

  const isInitialLoading = isLoadingPrograms || isLoadingReviews;

  const isFiltering = programId !== ALL_PROGRAMS && isLoadingProgramReviews;

  if (isInitialLoading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className={scss["review-admin-list"]}>
      <div className={scss["review-admin-list__filter"]}>
        <div className={scss["review-admin-list__filter-item"]}>
          <p
            className={classNames(scss["review-admin-list__filter-text"], "p2")}
          >
            Сортировать по:
          </p>

          <Select
            value={programId}
            onValueChange={setProgramId}
            placeholder="Все программы"
            items={[
              {
                value: ALL_PROGRAMS,
                label: "Все программы",
              },
              ...(programs ?? []).map((program) => ({
                value: program.id,
                label: program.name,
              })),
            ]}
          />
        </div>
      </div>

      {isFiltering && (
        <p className={scss["review-admin-list__loading"]}>Загрузка...</p>
      )}

      {!isFiltering && reviews?.length === 0 && (
        <p className="p2">Отзывы не найдены</p>
      )}

      <AdminItems>
        {reviews?.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            variant="admin"
            onDelete={(id) => deleteReview.mutate(id)}
            deleteStatus={{
              isPending: deleteReview.isPending,
              id: deleteReview.variables,
            }}
          />
        ))}
      </AdminItems>
    </div>
  );
};
