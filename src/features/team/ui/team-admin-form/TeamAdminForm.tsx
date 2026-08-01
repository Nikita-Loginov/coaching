"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import classNames from "classnames";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";

import { Button, Input, MultiBoxTextField, ImageUpload } from "@/shared/ui";
import { useTeamQuery } from "../../model/useTeamsQuery";
import {
  useCreateTeam,
  useDeleteTeam,
  useUpdateTeam,
} from "../../model/useTeamMutations";

import {
  TeamFormValues,
  teamSchema,
  TeamFormInput,
} from "@/entities/team/model/team.schema";

import scss from "../../../admin/styles/AdminForm.module.scss";

interface TeamAdminFormProps {
  id?: string;
  mode: "create" | "edit";
}

export const TeamAdminForm = ({ id, mode }: TeamAdminFormProps) => {
  const router = useRouter();
  const isEdit = Boolean(id);

  const { data: team, isLoading } = useTeamQuery(id);
  const createTeam = useCreateTeam();
  const updateTeam = useUpdateTeam(id ?? "");
  const deleteTeam = useDeleteTeam();

  const defaultValues = useMemo<TeamFormValues>(
    () => ({
      id: "",
      name: "",
      middlename: "",
      post: "",
      img: "",
      city: "",
      info: [],
      specializing: [],
      certification: [],
      principle: "",
      telegram: "",
      vk: "",
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
  } = useForm<TeamFormInput>({
    resolver: zodResolver(teamSchema),
    defaultValues,
  });

  useEffect(() => {
    if (team && isEdit) {
      reset({
        id: team.id,
        name: team.name,
        middlename: team.middlename,
        post: team.post,
        img: typeof team.img === "string" ? team.img : team.img.src,
        city: team.city,
        info: team.info,
        specializing: team.specializing,
        certification: team.certification,
        principle: team.principle,
        telegram: team.socials?.telegram ?? "",
        vk: team.socials?.vk ?? "",
      });
    }
  }, [team, isEdit, reset]);

  const info = useWatch({
    control,
    name: "info",
  });

  const specializing = useWatch({
    control,
    name: "specializing",
  });

  const certification = useWatch({
    control,
    name: "certification",
  });

  const onSubmit = async (data: TeamFormInput) => {
    const parsed = teamSchema.parse(data);

    try {
      if (isEdit && id) {
        await updateTeam.mutateAsync(parsed);
      } else {
        await createTeam.mutateAsync(parsed);
      }

      router.push("/admin/teams");
    } catch (error) {
      console.error("Ошибка сохранения тимейта:", error);
    }
  };

  if (isEdit && isLoading) return <p className="p2">Загрузка тимейта...</p>;

  return (
    <form className={scss["admin-form"]} onSubmit={handleSubmit(onSubmit)}>
      <div className={scss["admin-form__top"]}>
        <Button
          theme="default"
          iconLeft={<ArrowLeft size={18} />}
          onClick={() => router.push("/admin/teams")}
        >
          <p className="p2">Назад к команде</p>
        </Button>

        <h1 className="h4">
          {isEdit
            ? `Редактирование: ${team?.name}`
            : "Создание участника команды"}
        </h1>
      </div>

      <div className={scss["admin-form__content"]}>
        <div className={scss["admin-form__inputs"]}>
          <div className={scss["admin-form__item"]}>
            <Input
              label="ID"
              placeholder="alexey-kiselev"
              {...register("id")}
              error={errors.id?.message}
            />
          </div>

          <div className={scss["admin-form__item"]}>
            <Input
              label="Имя"
              placeholder="Алексей"
              {...register("name")}
              error={errors.name?.message}
            />
          </div>

          <div className={scss["admin-form__item"]}>
            <Input
              label="Отчество"
              placeholder="Иванович"
              {...register("middlename")}
              error={errors.middlename?.message}
            />
          </div>

          <div className={scss["admin-form__item"]}>
            <Input
              label="Должность"
              placeholder="Executive Coach"
              {...register("post")}
              error={errors.post?.message}
            />
          </div>

          <div className={scss["admin-form__item"]}>
            <Input
              label="Город"
              placeholder="Москва"
              {...register("city")}
              error={errors.city?.message}
            />
          </div>

          <div className={scss["admin-form__item"]}>
            <ImageUpload
              value={watch("img")}
              onChange={(url) => {
                setValue("img", url, {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
              label="Фото"
            />
          </div>

          <div
            className={classNames(
              scss["admin-form__item"],
              scss["admin-form__item--big"]
            )}
          >
            <MultiBoxTextField
              label="Информация"
              btnAddText="Добавить"

              items={(info ?? []).map((value, index) => ({
                id: String(index),
                value: value ?? "",
              }))}

              onAdd={() => {
                setValue("info", [...(info ?? []), ""], {
                  shouldDirty: true,
                });
              }}

              onRemove={(id) => {
                const index = Number(id);

                setValue("info", info?.filter((_, i) => i !== index) ?? [], {
                  shouldDirty: true,
                });
              }}

              onUpdate={(id, value) => {
                const index = Number(id);

                const updated = [...(info ?? [])];

                updated[index] = value;

                setValue("info", updated, {
                  shouldDirty: true,
                });
              }}
            />
          </div>

          <div
            className={classNames(
              scss["admin-form__item"],
              scss["admin-form__item--big"]
            )}
          >
            <MultiBoxTextField
              label="Специализация"
              btnAddText="Добавить направление"
              items={(specializing ?? []).map((value, index) => ({
                id: String(index),
                value: value ?? "",
              }))}
              onAdd={() => {
                setValue("specializing", [...(specializing ?? []), ""], {
                  shouldDirty: true,
                });
              }}
              onRemove={(id) => {
                const index = Number(id);

                setValue(
                  "specializing",
                  specializing?.filter((_, i) => i !== index) ?? [],
                  {
                    shouldDirty: true,
                  }
                );
              }}
              onUpdate={(id, value) => {
                const index = Number(id);

                const updated = [...(specializing ?? [])];
                updated[index] = value;

                setValue("specializing", updated, {
                  shouldDirty: true,
                });
              }}
              placeholder="Например: Executive коучинг"
              emptyText="Нет добавленных направлений"
              error={errors.specializing?.message}
            />
          </div>

          <div
            className={classNames(
              scss["admin-form__item"],
              scss["admin-form__item--big"]
            )}
          >
            <MultiBoxTextField
              label="Сертификация"
              btnAddText="Добавить сертификат"
              items={(certification ?? []).map((value, index) => ({
                id: String(index),
                value: value ?? "",
              }))}
              onAdd={() => {
                setValue("certification", [...(certification ?? []), ""], {
                  shouldDirty: true,
                });
              }}
              onRemove={(id) => {
                const index = Number(id);

                setValue(
                  "certification",
                  certification?.filter((_, i) => i !== index) ?? [],
                  {
                    shouldDirty: true,
                  }
                );
              }}
              onUpdate={(id, value) => {
                const index = Number(id);

                const updated = [...(certification ?? [])];
                updated[index] = value;

                setValue("certification", updated, {
                  shouldDirty: true,
                });
              }}
              placeholder="Например: PCC ICF"
              emptyText="Нет добавленных сертификатов"
              error={errors.certification?.message}
            />
          </div>

          <div
            className={classNames(
              scss["admin-form__item"],
              scss["admin-form__item--big"]
            )}
          >
            <Input
              label="Принципы работы"
              placeholder="Описание подхода специалиста"
              as="textarea"
              {...register("principle")}
              error={errors.principle?.message}
            />
          </div>

          <div className={scss["admin-form__item"]}>
            <Input
              label="Telegram"
              placeholder="@username"
              {...register("telegram")}
              error={errors.telegram?.message}
            />
          </div>

          <div className={scss["admin-form__item"]}>
            <Input
              label="VK"
              placeholder="https://vk.com/username"
              {...register("vk")}
              error={errors.vk?.message}
            />
          </div>
        </div>
      </div>

      <div className={scss["admin-form__footer"]}>
        <div
          className={classNames(
            scss["admin-form__btns"]
          )}
        >
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
