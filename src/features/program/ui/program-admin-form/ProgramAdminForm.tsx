"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import classNames from "classnames";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";

import {
  Button,
  Input,
  Select,
  MultiBoxTextField,
  MultiBoxTitleDescriptionField,
} from "@/shared/ui";
import { useProgramQuery } from "../../model/useProgramsQuery";
import {
  useCreateProgram,
  useUpdateProgram,
} from "../../model/useProgramMutations";
import {
  programSchema,
  ProgramFormValues,
  ProgramFormInput,
} from "@/entities/program/model/program.schema";

import {
  PROGRAM_ICON_KEYS,
  PROGRAM_ICON_LABELS,
  type ProgramIconKey,
} from "@/entities/program/lib/icon-map";
import type { CurrencyType } from "@/shared/types";

import scss from "../../../admin/styles/AdminForm.module.scss";

interface ProgramAdminFormProps {
  id?: string;
  mode: "create" | "edit";
}

export const ProgramAdminForm = ({ id, mode }: ProgramAdminFormProps) => {
  const router = useRouter();
  const isEdit = Boolean(id);

  const { data: program, isLoading } = useProgramQuery(id);
  const createProgram = useCreateProgram();
  const updateProgram = useUpdateProgram();

  const defaultValues = useMemo<ProgramFormValues>(
    () => ({
      id: program?.id || "",
      name: program?.name || "",
      description: program?.description || "",
      sessions: program?.duration?.sessions ?? 1,
      months: program?.duration?.months ?? 1,
      price: program?.price || "",
      currency: (program?.currency as CurrencyType) || "rub",
      icon: (program?.icon as ProgramIconKey) || "user",
      targetAudience: program?.targetAudience.map((value) => ({ value })) ?? [],
      benefits: program?.benefits.map((value) => ({ value })) ?? [],
      includes: program?.includes.map((value) => ({ value })) ?? [],
      curriculum: program?.curriculum || [],
      seoTitle: program?.seo?.title || "",
      seoDescription: program?.seo?.description || "",
      seoImage: program?.seo?.image || "",
      seoKeywords: program?.seo.keywords.map((value) => ({ value })) ?? [],
    }),
    [program]
  );

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProgramFormInput>({
    resolver: zodResolver(programSchema),
    defaultValues,
  });

  const targetAudienceField = useFieldArray({
    control,
    name: "targetAudience",
  });

  const benefitsField = useFieldArray({
    control,
    name: "benefits",
  });

  const includesField = useFieldArray({
    control,
    name: "includes",
  });

  const curriculumField = useFieldArray({
    control,
    name: "curriculum",
  });

  const seoKeywordsField = useFieldArray({
    control,
    name: "seoKeywords",
  });

  const targetAudience = useWatch({
    control,
    name: "targetAudience",
  });

  const benefits = useWatch({
    control,
    name: "benefits",
  });

  const includes = useWatch({
    control,
    name: "includes",
  });

  const curriculum = useWatch({
    control,
    name: "curriculum",
  });

  const seoKeywords = useWatch({
    control,
    name: "seoKeywords",
  });

  useEffect(() => {
    if (program && isEdit) {
      reset(defaultValues);
    }
  }, [program, isEdit, setValue]);

  const onSubmit = async (data: ProgramFormInput) => {
    const parsed = programSchema.parse(data);

    try {
      if (isEdit && id) {
        await updateProgram.mutateAsync({
          id,
          data: parsed,
        });
      } else {
        await createProgram.mutateAsync(parsed);

        router.push("/admin/programs");
      }

      router.push("/admin/programs");
    } catch (error) {
      console.error("Ошибка сохранения программы:", error);
    }
  };

  if (isEdit && isLoading) return <p className="p2">Загрузка программы...</p>;

  return (
    <form className={scss["admin-form"]} onSubmit={handleSubmit(onSubmit)}>
      <div className={scss["admin-form__top"]}>
        <Button
          theme="default"
          iconLeft={<ArrowLeft size={18} />}
          size="default"
          onClick={() => router.push("/admin/programs")}
        >
          <p className="p2">Назад к программам</p>
        </Button>

        <h1 className="h4">
          {isEdit ? `Редактирование: ${program?.name}` : "Создание программы"}
        </h1>
      </div>

      <div className={scss["admin-form__content"]}>
        <div className={scss["admin-form__inputs"]}>
          <div className={scss["admin-form__item"]}>
            <Input
              label="ID (слаг для URL)"
              placeholder="individual-coaching"
              {...register("id")}
              error={errors.id?.message}
            />
          </div>

          <div className={scss["admin-form__item"]}>
            <Input
              label="Название программы"
              placeholder="Название"
              {...register("name")}
              error={errors.name?.message}
            />
          </div>

          <div className={scss["admin-form__item"]}>
            <Input
              label="Кол-во сессий"
              placeholder="2"
              typeInput="text"
              {...register("sessions", { valueAsNumber: true })}
              error={errors.sessions?.message}
            />
          </div>

          <div className={scss["admin-form__item"]}>
            <Input
              label="Длительность, мес."
              placeholder="10"
              typeInput="text"
              {...register("months", { valueAsNumber: true })}
              error={errors.months?.message}
            />
          </div>

          <div className={scss["admin-form__item"]}>
            <Select
              items={[
                { value: "rub", label: "₽ (rub)" },
                { value: "eu", label: "€ (eu)" },
              ]}
              value={watch("currency")}
              onValueChange={(val) => setValue("currency", val as "rub" | "eu")}
              label="Валюта"
            />
          </div>

          <div className={scss["admin-form__item"]}>
            <Select
              items={PROGRAM_ICON_KEYS.map((key) => ({
                value: key,
                label: PROGRAM_ICON_LABELS[key],
              }))}
              value={watch("icon")}
              onValueChange={(val) => setValue("icon", val as ProgramIconKey)}
              label="Иконка"
            />
          </div>

          <div
            className={classNames(
              scss["admin-form__item"],
              scss["admin-form__item--big"]
            )}
          >
            <Input
              label="Цена"
              placeholder="50 000"
              {...register("price")}
              error={errors.price?.message}
            />
          </div>

          <div
            className={classNames(
              scss["admin-form__item"],
              scss["admin-form__item--big"]
            )}
          >
            <Input
              label="Описание"
              placeholder="Описание"
              as="textarea"
              {...register("description")}
              error={errors.description?.message}
            />
          </div>

          <div
            className={classNames(
              scss["admin-form__item"],
              scss["admin-form__item--big"]
            )}
          >
            <MultiBoxTextField
              label="Целевая аудитория"
              btnAddText="Добавить сегмент"
              items={targetAudienceField.fields.map((field, index) => ({
                id: field.id,
                value: targetAudience?.[index]?.value ?? "",
              }))}
              onAdd={() =>
                targetAudienceField.append({
                  value: "",
                })
              }
              onRemove={(id) => {
                const index = targetAudienceField.fields.findIndex(
                  (field) => field.id === id
                );

                if (index !== -1) {
                  targetAudienceField.remove(index);
                }
              }}
              onUpdate={(id, value) => {
                const index = targetAudienceField.fields.findIndex(
                  (field) => field.id === id
                );

                if (index !== -1) {
                  setValue(`targetAudience.${index}.value`, value);
                }
              }}
              placeholder="Например: Начинающие предприниматели"
              emptyText="Нет добавленных сегментов аудитории"
              error={errors.targetAudience?.message}
            />
          </div>

          <div
            className={classNames(
              scss["admin-form__item"],
              scss["admin-form__item--big"]
            )}
          >
            <MultiBoxTextField
              label="Результаты"
              btnAddText="Добавить результат"
              items={benefitsField.fields.map((field, index) => ({
                id: field.id,
                value: benefits?.[index]?.value ?? "",
              }))}
              onAdd={() =>
                benefitsField.append({
                  value: "",
                })
              }
              onRemove={(id) => {
                const index = benefitsField.fields.findIndex(
                  (field) => field.id === id
                );

                if (index !== -1) {
                  benefitsField.remove(index);
                }
              }}
              onUpdate={(id, value) => {
                const index = benefitsField.fields.findIndex(
                  (field) => field.id === id
                );

                if (index !== -1) {
                  setValue(`benefits.${index}.value`, value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }
              }}
              placeholder="Описание результата"
              emptyText="Нет добавленных преимуществ"
              error={errors.benefits?.message}
            />
          </div>

          <div
            className={classNames(
              scss["admin-form__item"],
              scss["admin-form__item--big"]
            )}
          >
            <MultiBoxTextField
              label="Что входит в стоимость программы"
              btnAddText="Добавить пункт"
              items={includesField.fields.map((field, index) => ({
                id: field.id,
                value: includes?.[index]?.value ?? "",
              }))}
              onAdd={() =>
                includesField.append({
                  value: "",
                })
              }
              onRemove={(id) => {
                const index = includesField.fields.findIndex(
                  (field) => field.id === id
                );

                if (index !== -1) {
                  includesField.remove(index);
                }
              }}
              onUpdate={(id, value) => {
                const index = includesField.fields.findIndex(
                  (field) => field.id === id
                );

                if (index !== -1) {
                  setValue(`includes.${index}.value`, value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }
              }}
              placeholder="Название пункта"
              emptyText="Нет добавленных пунктов"
              error={errors.includes?.message}
            />
          </div>

          <div
            className={classNames(
              scss["admin-form__item"],
              scss["admin-form__item--big"]
            )}
          >
            <MultiBoxTitleDescriptionField
              label="Модули программы"
              btnAddText="Добавить модуль"
              items={curriculumField.fields.map((field, index) => ({
                id: field.id,
                title: watch(`curriculum.${index}.title`) || "",
                description: watch(`curriculum.${index}.description`) || "",
              }))}
              onAdd={() =>
                curriculumField.append({ title: "", description: "" })
              }
              onRemove={(id) => {
                const index = curriculumField.fields.findIndex(
                  (field) => field.id === id
                );
                if (index !== -1) curriculumField.remove(index);
              }}
              onUpdate={(id, field, value) => {
                const index = curriculumField.fields.findIndex(
                  (field) => field.id === id
                );
                if (index !== -1) {
                  setValue(`curriculum.${index}.${field}` as any, value);
                }
              }}
              titlePlaceholder="Заголовок модуля"
              descriptionPlaceholder="Описание модуля"
              emptyText="Нет добавленных модулей"
              error={errors.curriculum?.message}
            />
          </div>

          <div
            className={classNames(
              scss["admin-form__item"],
              scss["admin-form__item--big"]
            )}
          >
            <Input
              label="Title Seo"
              placeholder="Executive коучинг | Алексей Киселев - PCC ICF"
              {...register("seoTitle")}
              error={errors.seoTitle?.message}
            />
          </div>

          <div
            className={classNames(
              scss["admin-form__item"],
              scss["admin-form__item--big"]
            )}
          >
            <Input
              label="Description Seo"
              placeholder="Коучинг для CEO, владельцев бизнеса..."
              as="textarea"
              {...register("seoDescription")}
              error={errors.seoDescription?.message}
            />
          </div>
          <div
            className={classNames(
              scss["admin-form__item"],
              scss["admin-form__item--big"]
            )}
          >
            <MultiBoxTextField
              label="Ключевые слова SEO"
              btnAddText="Добавить ключевое слово"
              items={seoKeywordsField.fields.map((field, index) => ({
                id: field.id,
                value: seoKeywords?.[index]?.value ?? "",
              }))}
              onAdd={() =>
                seoKeywordsField.append({
                  value: "",
                })
              }
              onRemove={(id) => {
                const index = seoKeywordsField.fields.findIndex(
                  (field) => field.id === id
                );

                if (index !== -1) {
                  seoKeywordsField.remove(index);
                }
              }}
              onUpdate={(id, value) => {
                const index = seoKeywordsField.fields.findIndex(
                  (field) => field.id === id
                );

                if (index !== -1) {
                  setValue(`seoKeywords.${index}.value`, value, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }
              }}
              placeholder="Например: executive коучинг"
              emptyText="Нет добавленных ключевых слов"
              error={errors.seoKeywords?.message}
            />
          </div>
        </div>
      </div>

      <div className={scss["admin-form__footer"]}>
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
    </form>
  );
};
