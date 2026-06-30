import { Tag, Container, ListsDots, Button } from "@/shared/ui";

import scss from "./HomeHero.module.scss";

export const HomeHero = () => {
  return (
    <section className={scss["home-hero"]}>
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

            <p className="p3 primary-color-100 font-text-second font-text-italic">
              Привет, я Алексей
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
                <p className="p4">200+ клиентов</p>,
                <p className="p4">98% достигают цели</p>,
                <p className="p4">ICF сертификат</p>,
              ]}
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
