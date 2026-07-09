import classNames from "classnames";

import type { ProgramItem } from "@/entities/program/model/program.types";

import { ListsDots } from "@/shared/ui";

import { ProgramDetailModule } from "../program-detail-module/ProgramDetailModule";
import { ProgramDetailCard } from "../program-detail-card/ProgramDetailCard";

import scss from "./ProgramDetailInfo.module.scss";

interface ProgramDetailInfoProps {
  program: ProgramItem;
}

export const ProgramDetailInfo = ({ program }: ProgramDetailInfoProps) => {
  const {
    targetAudience,
    benefits,
    curriculum,
  } = program;

  return (
    <div className={scss["program-detail-info"]}>
      <div className={scss["program-detail-info__content"]}>
        {targetAudience.length > 0 ? (
          <div className={scss["program-detail-info__block"]}>
            <p className={scss["program-detail-info__block-title"]}>
              Для кого программа
            </p>

            <ListsDots
              direction="column"
              theme="primary-two"
              items={targetAudience.map((target, index) => {
                return (
                  <p className="p3" key={index}>
                    {target}
                  </p>
                );
              })}
            />
          </div>
        ) : null}

        {benefits.length > 0 ? (
          <div className={scss["program-detail-info__block"]}>
            <p className={scss["program-detail-info__block-title"]}>
              Что вы получите
            </p>

            <ListsDots
              direction="column"
              theme="primary-two"
              items={benefits.map((target, index) => {
                return (
                  <p className="p3" key={index}>
                    {target}
                  </p>
                );
              })}
            />
          </div>
        ) : null}

        {curriculum.length > 0 ? (
          <div
            className={classNames(
              scss["program-detail-info__block"],
              scss["program-detail-info__block--big"]
            )}
          >
            <p className={scss["program-detail-info__block-title"]}>
              Программа
            </p>

            <ProgramDetailModule curriculum={curriculum} />
          </div>
        ) : null}
      </div>

      <div className={scss["program-detail-info__info"]}>
        <ProgramDetailCard program={program} />
      </div>
    </div>
  );
};
