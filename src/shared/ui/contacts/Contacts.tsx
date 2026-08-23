import classNames from "classnames";
import { Mail, Phone, Send } from "lucide-react";
import Link from "next/link";

import { PERSON_CONFIG } from "@/shared/config/person/person.config";

import { Container } from "../container/Container";

import scss from "./Contacts.module.scss";

const { socials } = PERSON_CONFIG;

const CONTACTS_ITEMS = [
  {
    title: "Email",
    to: `mailto:${socials.email}`,
    icon: Mail,
    ariaLabel: "Написать на email",
  },
  {
    title: "Телефон",
    to: `tel:${socials.phone}`,
    icon: Phone,
    ariaLabel: "Позвонить по телефону",
  },
  {
    title: "Телеграм",
    to: socials.telegram,
    icon: Send,
    ariaLabel: "Написать в Telegram",
  },
];

export const Contacts = () => {
  return (
    <section className={scss["contacts"]} id="contacts">
      <Container>
        <div className={scss["contacts__inner"]}>
          <div className={scss["contacts__block"]}>
            <h2 className="h2">
              Начните с бесплатной <br /> сессии-знакомства
            </h2>

            <div className={classNames("textbox", scss["contacts__textbox"])}>
              <p className="p2">
                30 минут без обязательств. Вы поймёте, подходит ли вам коучинг и
                насколько мы совпадаем по стилю работы.
              </p>
            </div>
          </div>

          <div className={scss["contacts__block"]}>
            <ul className={scss["contacts__list"]}>
              {CONTACTS_ITEMS.map((item, index) => {
                const Icon = item.icon;

                return (
                  <li key={index} className={scss["contacts__item"]}>
                    <Link
                      className={scss["contacts__link"]}
                      aria-label={item.ariaLabel}
                      title={item.title}
                      href={item.to}
                    >
                      <div className={scss["contacts__link-icon"]}>
                        <Icon />
                      </div>

                      <div className={scss["contacts__link-block"]}>
                        <p className="p3 uppercase-text gray-color-300">{item.title}</p>

                        <p className={classNames("p3", scss['contacts__link-href'])}>
                          {item.to}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
};
