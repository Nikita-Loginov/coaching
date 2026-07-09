import classNames from "classnames";

import type { ProgramItem } from "../../model/program.types";

import { Button } from "@/shared/ui";

import { getSymbolCurrency } from "@/shared/utils";

import scss from "./ProgramCard.module.scss";

interface ProgramCardProps {
  card: ProgramItem;
}

export const ProgramCard = ({ card }: ProgramCardProps) => {
  const { id, name, description, duration, price, icon, currency } = card;

  return (
    <div className={scss["program"]}>
      <div className={scss["program__top"]}>
        <div className={scss["program__icon"]}>{icon}</div>
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
        <div className={scss["program__btns"]}>
          <Button
            theme="secondary"
            size="medium"
            as="link"
            to={`/program/${id}`}
          >
            <p className="p2">Подробнее</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
