"use client";

import { ContactMessageBtn } from "@/features/contact-message/ui";

import scss from "./TeamDetailBanner.module.scss";

export const TeamDetailBanner = () => {
  return (
    <div className={scss["team-detail-banner"]}>
      <div className={scss["team-detail-banner__top"]}>
        <p className="p2 bold-font">Готовы помочь вам найти свои ответы</p>
      </div>

      <div className={scss["team-detail-banner__footer"]}>
        <div className={scss["team-detail-banner__btns"]}>
          <ContactMessageBtn size="medium">
            <p className="p2">Записаться на консультацию</p>
          </ContactMessageBtn>
        </div>

        <p className="p4">Работаем по стандартам ICF</p>
      </div>
    </div>
  );
};

export default TeamDetailBanner;
