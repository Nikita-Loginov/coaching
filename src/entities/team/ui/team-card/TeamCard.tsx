import Link from "next/link";
import Image from "next/image";
import classNames from "classnames";

import { TeamItem } from "../../model/team.types";

import { Button, Tag } from "@/shared/ui";

import scss from "./TeamCard.module.scss";

interface TeamCardProps {
  item: TeamItem;
  variant?: "default" | "admin";
  onDelete?: (id: string) => void;
  deleteStatus?: {
    isPending: boolean;
    id?: string;
  };
}

export const TeamCard = ({
  item,
  variant = "default",
  onDelete,
  deleteStatus,
}: TeamCardProps) => {
  const { name, middlename, post, id, img } = item;

  const isDeleting = deleteStatus?.isPending && deleteStatus.id === id;

  const href =
    variant === "default" ? `/teams/${id}` : `/admin/teams/edit/${id}`;

  const isAdmin = variant === "admin";

  const content = (
    <>
      {/* {!isAdmin ? ( */}
      <div className={scss["team-card__img-box"]}>
        <Image src={img} alt={`${name} ${middlename}`} fill />
      </div>
      {/* ) : null} */}

      <div className={scss["team-card__content"]}>
        <p className="p2">
          {name} {middlename}
        </p>

        <Tag>
          <p className="p3">{post}</p>
        </Tag>
      </div>
    </>
  );

  return (
    <div className={scss["team-card-box"]}>
      {isAdmin ? (
        <div className={classNames(scss["team-card"], scss["team-card--admin"])}>{content}</div>
      ) : (
        <Link
          href={href}
          title={`${name} ${middlename}`}
          aria-label={`Перейти на детальную информацию ${name} ${middlename}`}
          className={classNames(scss["team-card"])}
        >
          {content}
        </Link>
      )}

      <div className={scss["team-card-box__btns"]}>
        {variant === "admin" && (
          <>
            <Button
              theme="remove"
              // size="medium"
              typeBtn="submit"
              disabled={isDeleting}
              onClick={() => onDelete?.(id)}
            >
              <p className="p3">{isDeleting ? "Удаление..." : "Удалить"}</p>
            </Button>

            <Button
              theme="primary"
              // iconLeft={<Pencil />}
              iconSize="medium"
              size="ghost"
              as="link"
              to={`/admin/teams/edit/${id}`}
            >
              <p className="p3">Редактировать</p>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
