import type { ProgramItem } from "@/entities/program/model/program.types";

import { Button, ListsDots } from "@/shared/ui";

import { getSymbolCurrency } from "@/shared/utils";

import scss from "./ProgramDetailCard.module.scss";

interface ProgramDetailCardProps {
  program: ProgramItem;
}

export const ProgramDetailCard = ({
  program: { currency, duration, includes, price },
}: ProgramDetailCardProps) => {
  return (
    <div className={scss["program-detail-card"]}>
      <div className={scss["program-detail-card__top"]}>
        <div className={scss["program-detail-card__block"]}>
          <p className="h3 primary-color-100 font-text-second">
            от {price} {getSymbolCurrency(currency)}
          </p>
        </div>

        {includes.length > 0 ? (
          <div className={scss["program-detail-card__info"]}>
            <p className="p2">В стоимость входит:</p>

            <ListsDots
              direction="column"
              items={includes.map((include, index) => (
                <p className="p3" key={index}>
                  {include}
                </p>
              ))}
            />
          </div>
        ) : null}
      </div>

      <div className={scss["program-detail-card__footer"]}>
        <div className={scss["program-detail-card__btns"]}>
          <Button size="medium">
            <p className="p2">Записаться</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
