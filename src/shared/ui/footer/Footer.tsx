import classNames from "classnames";

import { Container } from "../container/Container";

import { PERSON_CONFIG } from "@/shared/config/person/person.config";

import { SOCIAL_ITEMS_PERSON } from "@/shared/config/social/social-items.config";

import { Logo } from "../logo/Logo";
import { Socials } from "../socials/Socials";
import { ListDefault } from "../lists/list-default/ListDefault";

import scss from "./Footer.module.scss";

export const Footer = () => {
  const cleanPhone = PERSON_CONFIG.socials.phone.replace(/\s/g, "");

  return (
    <footer className={scss["footer"]}>
      <Container>
        <div className={scss["footer__inner"]}>
          <div className={scss["footer__block"]}>
            <Logo />

            <div className="textbox">
              <p className="p3 gray-color-70">
                © 2026 Алексей Киселев. Все права защищены.
              </p>
            </div>
          </div>

          <div
            className={classNames(
              scss["footer__block"],
              scss["footer__block--center"]
            )}
          >
            <p className="p2 primary-color-100">Следите за мной</p>

            <Socials className={scss["footer__socials"]} items={SOCIAL_ITEMS_PERSON}/>
          </div>

          <ListDefault
            items={[
              {
                as: "link",
                to: `mailto:${PERSON_CONFIG.socials.email}`,
                label: `${PERSON_CONFIG.socials.email}`,
                ariaLabel: `Написать на почту ${PERSON_CONFIG.socials.email}`,
              },
              {
                as: "link",
                to: `tel:${cleanPhone}`,
                label: `${PERSON_CONFIG.socials.phone}`,
                ariaLabel: `Позвонить по номеру ${PERSON_CONFIG.socials.phone}`,
              },
            ]}
            className={scss["footer__list"]}
          />
        </div>
      </Container>
    </footer>
  );
};
