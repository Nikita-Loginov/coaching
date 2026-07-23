import Image from "next/image";
import { FaTelegramPlane } from "react-icons/fa";
import { IoLogoVk } from "react-icons/io5";

import type { TeamItem } from "@/entities/team/model/team.types";

import { Socials } from "@/shared/ui";

import type { SocialItem } from "@/shared/types/social.types";

import scss from "./TeamDetailCard.module.scss";

interface TeamDetailCardProps {
  team: TeamItem;
}

export const TeamDetailCard = ({
  team: { img, name, middlename, post, socials, city },
}: TeamDetailCardProps) => {
  const social_items: SocialItem[] = [];

  if (socials?.telegram) {
    social_items.push({
      icon: <FaTelegramPlane />,
      to: socials.telegram,
    });
  }

  if (socials?.vk) {
    social_items.push({
      icon: <IoLogoVk />,
      to: socials.vk,
    });
  }

  return (
    <div className={scss["team-detail-card"]}>
      <div className={scss["team-detail-card__img"]}>
        <Image src={img} alt={`${name} ${middlename}`} />
      </div>

      <div className={scss["team-detail-card__info"]}>
        <div className={scss["team-detail-card__block"]}>
          <h1 className="h3">
            {name} {middlename}
          </h1>

          <div className={scss["team-detail-card__block-info"]}>
            <p className="p2 primary-color-100">{post}</p>

            {city && <p className="p3">{city}</p>}
          </div>
        </div>

        <Socials items={social_items} />
      </div>
    </div>
  );
};

export default TeamDetailCard;