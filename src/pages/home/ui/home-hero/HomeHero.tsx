import classNames from "classnames";

import { Tag, Container, ListsDots, Button } from "@/shared/ui";

import { PERSON_CONFIG } from "@/shared/config/person/person.config";

import scss from "./HomeHero.module.scss";

export const HomeHero = () => {
  return (
    <section className={classNames(scss["home-hero"], 'top-block')}>
      <Container className={scss["home-hero__container"]}>
        <div className={scss["home-hero__inner"]}>
          <div className={scss["home-hero__block"]}>
            <Tag>
              <ListsDots
                items={[
                  <p className="p4 uppercase-text">ICF АККРЕДИТОВАН</p>,
                  <p className="p4 uppercase-text">10+ лЕТ ОПЫТА</p>,
                ]}
              />
            </Tag>

            <p className="p2 primary-color-100 font-text-second font-text-italic" >
              Привет, я {PERSON_CONFIG.name}
            </p>

            <h1 className="h1 text-center font-text-second">
              Я не даю ответов. <br /> Я помогаю их найти.
            </h1>
          </div>

          <div className={scss["home-hero__footer"]}>
            <div className={scss["home-hero__btns"]}>
              <Button theme="primary" size="medium">
                <p className="p2">Начать диалог</p>
              </Button>

              <Button theme="secondary" size="medium">
                <p className="p2">Узнать о программах</p>
              </Button>
            </div>

            <ListsDots
              items={[
                <p className="p4">{PERSON_CONFIG.clients} клиентов</p>,
                <p className="p4">
                  {PERSON_CONFIG.successRate} достигают цели
                </p>,
                <p className="p4">ICF сертификат</p>,
              ]}
              className={scss['home-hero__list']}
            />
          </div>
        </div>
      </Container>

      <div className={scss["home-hero__bg"]}>
        <div className={scss["home-hero__bg-top"]}></div>

        <div className={scss["home-hero__bg-items"]}>
          <div className={scss["home-hero__bg-decor"]}></div>

          <div className={scss["home-hero__bg-decor"]}></div>

          <div className={scss["home-hero__bg-decor"]}></div>

          <div className={scss["home-hero__bg-decor"]}></div>
        </div>
      </div>
    </section>
  );
};
