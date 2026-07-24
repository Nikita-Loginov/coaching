"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import classNames from "classnames";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";

import { Button, Input, MultiBoxTextField, Select } from "@/shared/ui";

import type { TargetType } from "@/shared/types/reviewable.types";

import { useReviewQuery } from "../../model/useReviewsQuery";
import {
  useCreateReview,
  useUpdateReview,
} from "../../model/useReviewMutations";

import {
  ReviewFormValues,
  ReviewFormInput,
  reviewSchema,
} from "@/entities/review/model/review.schema";
import { useProgramsQuery } from "@/features/program/model/useProgramsQuery";

import scss from "../../../admin/styles/AdminForm.module.scss";

interface ReviewAdminFormProps {
  id?: string;
  mode: "create" | "edit";
}

export const ReviewAdminForm = ({ id, mode }: ReviewAdminFormProps) => {
  const router = useRouter();
  const isEdit = Boolean(id);

  const { data: review, isLoading } = useReviewQuery(id);
  const createReview = useCreateReview();
  const updateReview = useUpdateReview(id ?? "");
  const { data: programs } = useProgramsQuery();

  const defaultValues = useMemo<ReviewFormValues>(
    () => ({
      authorName: "",
      authorPost: "",
      desc: [],
      targetType: "program",
      targetId: "",
    }),
    []
  );

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ReviewFormInput>({
    resolver: zodResolver(reviewSchema),
    defaultValues,
  });

  useEffect(() => {
    if (review && isEdit) {
      reset({
        authorName: review.author.name,
        authorPost: review.author.post,
        desc: review.desc,
        targetType: review.targetType,
        targetId: review.targetId,
      });
    }
  }, [review, isEdit, reset]);

  const desc = useWatch({
    control,
    name: "desc",
  });

  const targetType = useWatch({
    control,
    name: "targetType",
  });

  const onSubmit = async (data: ReviewFormInput) => {
    const parsed = reviewSchema.parse(data);

    try {
      if (isEdit && id) {
        await updateReview.mutateAsync(parsed);
      } else {
        await createReview.mutateAsync(parsed);
      }

      router.push("/admin/reviews");
    } catch (error) {
      console.error("Ошибка сохранения отзыва:", error);
    }
  };

  if (isEdit && isLoading) return <p className="p2">Загрузка отзыва...</p>;

  // console.log(review, 'review')

  return (
    <form className={scss["admin-form"]} onSubmit={handleSubmit(onSubmit)}>
      <div className={scss["admin-form__top"]}>
        <Button
          theme="default"
          iconLeft={<ArrowLeft size={18} />}
          onClick={() => router.push("/admin/reviews")}
        >
          <p className="p2">Назад к отзывам</p>
        </Button>

        <h1 className="h4">
          {isEdit
            ? `Редактирование отзыва от: ${review?.author.name}`
            : "Создание отзыва"}
        </h1>
      </div>

      <div className={scss["admin-form__content"]}>
        <div className={scss["admin-form__inputs"]}>
          <div className={scss["admin-form__item"]}>
            <Input
              label="Автор"
              placeholder="Иван Иванов"
              {...register("authorName")}
              error={errors.authorName?.message}
            />
          </div>

          <div className={scss["admin-form__item"]}>
            <Input
              label="Должность"
              placeholder="CEO компании"
              {...register("authorPost")}
              error={errors.authorPost?.message}
            />
          </div>

          <div
            className={classNames(
              scss["admin-form__item"],
              scss["admin-form__item--big"]
            )}
          >
            <MultiBoxTextField
              label="Абзацы отзыва"
              btnAddText="Добавить абзац"
              items={(desc ?? []).map((value, index) => ({
                id: String(index),
                value,
              }))}
              onAdd={() =>
                setValue("desc", [...(desc ?? []), ""], {
                  shouldDirty: true,
                })
              }
              onRemove={(id) => {
                const index = Number(id);

                setValue(
                  "desc",
                  desc.filter((_, i) => i !== index),
                  { shouldDirty: true }
                );
              }}
              onUpdate={(id, value) => {
                const updated = [...desc];
                updated[Number(id)] = value;

                setValue("desc", updated, {
                  shouldDirty: true,
                });
              }}
              error={errors.desc?.message}
            />
          </div>

          <div className={scss["admin-form__item"]}>
            <Select
              label="Тип отзыва"
              value={watch("targetType")}
              onValueChange={(value) =>
                setValue("targetType", value as TargetType, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              items={[
                {
                  value: "program",
                  label: "Программа",
                },
                // {
                //   value: "course",
                //   label: "Курс",
                // },
              ]}
            />
          </div>

          <div className={scss["admin-form__item"]}>
            <Select
              label={targetType === "program" ? "Программа" : "Курс"}
              value={watch("targetId")}
              onValueChange={(value) =>
                setValue("targetId", value, {
                  shouldDirty: true,
                  shouldValidate: true,
                })
              }
              items={
                targetType === "program"
                  ? (programs ?? []).map((program) => ({
                      value: program.id,
                      label: program.name,
                    }))
                  : []
              }
            />
          </div>
        </div>
      </div>

      <div className={scss["admin-form__footer"]}>
        <div className={classNames(scss["admin-form__btns"])}>
          <Button
            theme="primary"
            size="medium"
            typeBtn="submit"
            disabled={isSubmitting}
          >
            <p className="p3">
              {isSubmitting
                ? "Сохранение..."
                : mode === "create"
                  ? "Создать"
                  : "Сохранить"}
            </p>
          </Button>
        </div>
      </div>
    </form>
  );
};
