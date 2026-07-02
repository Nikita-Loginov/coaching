import classNames from "classnames";

import { SOCIALS_ITEMS } from "./config/socials-items.config";

import { Button } from "../button/Button/Button";

import scss from "./Socials.module.scss";

interface SocialsProps {
  className?: string;
}

export const Socials = ({ className }: SocialsProps) => {
  return (
    <ul className={classNames(scss["socials"], className)}>
      {SOCIALS_ITEMS.map((social, index) => {
        return (
          <li className={scss["socials__link"]}>
            <Button
              key={index}
              iconLeft={social.icon}
              as="link"
              to={social.to}
              variant="icon"
              theme="flat"
              iconSize="big"
              target="_blank"
            />
          </li>
        );
      })}
    </ul>
  );
};
