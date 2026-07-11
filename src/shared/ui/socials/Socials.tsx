import classNames from "classnames";

import type { SocialItem } from "@/shared/types/social.types";

import { Button } from "../button/Button/Button";

import scss from "./Socials.module.scss";

interface SocialsProps {
  className?: string;
  items: SocialItem[]
}

export const Socials = ({ className, items }: SocialsProps) => {
  return (
    <ul className={classNames(scss["socials"], className)}>
      {items.map((social, index) => {
        return (
          <li className={scss["socials__link"]}>
            <Button
              key={index}
              iconLeft={social.icon}
              as="link"
              to={social.to}
              variant="icon"
              theme="secondary"
              iconSize="medium"
              target="_blank"
               ariaLabel="Перейти соц сеть"
            />
          </li>
        );
      })}
    </ul>
  );
};
