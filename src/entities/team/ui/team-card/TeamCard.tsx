import Link from "next/link";
import Image from "next/image";

import { TeamItem } from "../../model/team.types";

import { Tag } from "@/shared/ui";

import scss from "./TeamCard.module.scss";

interface TeamCardProps {
  item: TeamItem;
  variant?: 'default' | 'admin'
}

export const TeamCard = ({ item, variant = 'default' }: TeamCardProps) => {
  const { name, middlename, post, id, img } = item;

  const href = variant === 'default' ? `/teams/${id}` : `/admin/teams/edit/${id}`

  return (
    <Link
      href={href}
      title={`${name} ${middlename}`}
      aria-label={`Перейти на детальную информацию ${name} ${middlename}`}
      className={scss["team-card"]}
    >
      <div className={scss["team-card__img-box"]}>
        <Image src={img} alt={`${name} ${middlename}`} fill />
      </div>

      <div className={scss["team-card__content"]}>
        <p className="p2">
          {name} {middlename}
        </p>

        <Tag>
          <p className="p3">{post}</p>
        </Tag>
      </div>
    </Link>
  );
};
