import classNames from "classnames";

import type { ProgramItem } from "../../model/program.types";

import { PROGRAM_ICON_MAP } from "../../lib/icon-map";

import { Button } from "@/shared/ui";

import { getSymbolCurrency } from "@/shared/utils";

import scss from "./ProgramCard.module.scss";

interface ProgramCardProps {
  card: ProgramItem;
  variant?: "default" | "admin";
}

export const ProgramCard = ({
  card,
  variant = "default",
}: ProgramCardProps) => {
  const { id, name, description, duration, price, icon, currency } = card;

  return (
    <div className={scss["program"]}>
      <div className={scss["program__top"]}>
        <div className={scss["program__icon"]}>{PROGRAM_ICON_MAP[icon]}</div>
      </div>

      <div className={scss["program__content"]}>
        <div className={scss["program__block"]}>
          {name && <p className="p1 font-text-second">{name}</p>}

          {description && (
            <div className="textbox gray-color-200">
              <p className="p2">{description}</p>
            </div>
          )}
        </div>

        {duration.months && duration.sessions ? (
          <div
            className={classNames(scss["program__block"], "primary-color-100")}
          >
            <p className="p3">
              {duration.sessions} сессий / {duration.months} месяца
            </p>

            <p className="p1 font-text-second">
              от {price} {getSymbolCurrency(currency)}
            </p>
          </div>
        ) : null}
      </div>

      <div className={scss["program__footer"]}>
        <div
          className={classNames(
            scss["program__btns"],
            variant === "admin" ? scss["program__btns--two"] : null
          )}
        >
          {variant === "default" ? (
            <Button
              theme="secondary"
              size="medium"
              as="link"
              ariaLabel="Перейти на детальную страницу программы"
              to={`/program/${id}`}
            >
              <p className="p2">Подробнее</p>
            </Button>
          ) : (
            <>
              <Button
                theme="primary"
                // iconLeft={<Pencil />}
                iconSize="medium"
                size="ghost"
              >
                <p className="p3">Редактировать</p>
              </Button>

              <Button
                theme="remove"
                // iconLeft={<Pencil />}
                iconSize="medium"
                size="ghost"
              >
                <p className="p3">Удалить</p>
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
