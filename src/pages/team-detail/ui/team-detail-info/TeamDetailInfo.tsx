import classNames from "classnames";

import type { TeamItem } from "@/entities/team/model/team.types";

import { TeamDetailCard } from "../team-detail-card/TeamDetailCard";
import { TeamDetailBanner } from "../team-detail-banner/TeamDetailBanner";

import { Tag, ListsDots } from "@/shared/ui";

import scss from "./TeamDetailInfo.module.scss";

interface TeamDetailInfoProps {
  team: TeamItem;
}

export const TeamDetailInfo = ({ team }: TeamDetailInfoProps) => {
  const { info, specializing, certification, principle } = team;

  return (
    <div className={scss["team-detail-info"]}>
      <TeamDetailCard team={team} />

      <div className={scss["team-detail-info__content"]}>
        <div className={scss["team-detail-info__content-info"]}>
          <div className={scss["team-detail-info__content-block"]}>
            <div className={classNames(scss['team-detail-info__block'], scss['team-detail-info__block--small'])}>
              <p className="p3 uppercase-text primary-color-100 bold-font">ОБО МНe</p>

              <p className="p1 bold-font">{principle}</p>
            </div>

            <div className={scss["team-detail-info__textbox"]}>
              {info.map((text, index) => {
                return (
                  <p className="p2" key={index}>
                    {text}
                  </p>
                );
              })}
            </div>
          </div>

          <div className={scss["team-detail-info__block"]}>
            <p className={scss["team-detail-info__title"]}>СПЕЦИАЛИЗАЦИя</p>

            <div className={scss["team-detail-info__tags"]}>
              {specializing.map((tag, index) => {
                return (
                  <Tag key={index}>
                    <p className="p3">{tag}</p>
                  </Tag>
                );
              })}
            </div>
          </div>

          <div className={scss["team-detail-info__block"]}>
            <p className={scss["team-detail-info__title"]}>СЕРТИФИКАЦИя</p>

            <ListsDots
              direction="column"
              theme="secondary"
              items={certification.map((link, index) => {
                return (
                  <p className="p3" key={index}>
                    {link}
                  </p>
                );
              })}
            />
          </div>
        </div>

        <TeamDetailBanner />
      </div>
    </div>
  );
};
