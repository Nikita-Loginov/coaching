"use client";

import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import classNames from "classnames";

import { Button, Input, Select } from "@/shared/ui";

import { useProgramQuery } from "../../model/useProgramsQuery";
import { useCreateProgram } from "../../model/useProgramMutations";

import type { ProgramFormData } from "@/entities/program/model/program.queries";
import type { ProgramFormValues } from "@/entities/program/model/program.schema";

import scss from "../../../admin/styles/AdminForm.module.scss";

const DEFAULT_VALUES: ProgramFormValues = {
  id: "", //
  name: "", //
  description: "",
  sessions: 1, //
  months: 1, //
  price: "", //
  currency: "rub", //
  icon: "user",
  targetAudience: [],
  benefits: [],
  includes: [],
  curriculum: [],
  seoTitle: "",
  seoDescription: "",
  seoImage: "",
  seoKeywords: [],
};

interface ProgramAdminFormeProps {
  id?: string;
}

export const ProgramAdminForm = ({ id }: ProgramAdminFormeProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isEdit = Boolean(id);

  const { data: program, isLoading } = useProgramQuery(id);
  const createProgram = useCreateProgram();

  if (isEdit && isLoading) return <p className="p2">Загрузка...</p>;

  const handleSubmit = (values: ProgramFormData) => {
    if (isEdit && id) {
      // updateProgram.mutate(values, {
      //   onSuccess: () => router.push("/admin/programs"),
      // });
    } else {
      createProgram.mutate(values, {
        onSuccess: () => router.push("/admin/programs"),
      });
    }
  };

  return (
    <form className={scss["admin-form"]}>
      <div className={scss["admin-form__top"]}>
        <Button
          theme="default"
          iconLeft={<ArrowLeft size={18} />}
          size="default"
          onClick={() => {
            router.push("/admin/programs");
          }}
        >
          <p className="p2">Назад к программам</p>
        </Button>

        <h1 className="h4">
          {isEdit ? `Редактирование: ${program?.name}` : "Создание программы"}
        </h1>
      </div>

      <div className={scss["admin-form__content"]}>
        <div className={scss["admin-form__inputs"]}>
          <div className={classNames(scss["admin-form__item"])}>
            <Input
              label="Название программы"
              placeholder="Название"
              name="name"
            />
          </div>

          <div className={classNames(scss["admin-form__item"])}>
            <Input
              label="ID (слаг для URL)"
              placeholder="individual-coaching"
              name="id"
            />
          </div>

          <div className={classNames(scss["admin-form__item"])}>
            <Input name="sessions" label="Кол-во сессий" placeholder="2" />
          </div>

          <div className={classNames(scss["admin-form__item"])}>
            <Input name="months" label="Длительность, мес." placeholder="10" />
          </div>

          <div className={classNames(scss["admin-form__item"])}>
            <Input name="price" label="Цена (текстом)" placeholder="50 000" />
          </div>

          <div className={classNames(scss["admin-form__item"])}>
            <Select
              items={[
                { value: "rub", label: "₽ (rub)" },
                { value: "eu", label: "€ (eu)" },
              ]}
              value="rub"
              label="Валюта"
            />
          </div>

          <div
            className={classNames(
              scss["admin-form__item"],
              scss["admin-form__item--big"]
            )}
          >
            <Input
              name="description"
              label="Описание"
              placeholder="Описание"
              as="textarea"
            />
          </div>

          <div
            className={classNames(
              scss["admin-form__item"],
              scss["admin-form__item--big"]
            )}
          >
            <Input
              name="targetAudience"
              label="Для кого (каждый пункт с новой строки)"
              placeholder="Для кого"
              as="textarea"
            />
          </div>
        </div>
      </div>
    </form>
  );
};
