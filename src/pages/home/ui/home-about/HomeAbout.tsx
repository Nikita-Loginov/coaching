import Image from "next/image";

import { Container, AboutInfo, CardIcon } from "@/shared/ui";

import { PERSON_CONFIG } from "@/shared/config/person/person.config";
import { ABOUT_STAT } from "./config/about-stat.config";
import { ABOUT_ADVANTAGES } from "./config/about-advantages.config";

import scss from "./HomeAbout.module.scss";

export const HomeAbout = () => {
  return (
    <section className={scss["home-about"]} id="about">
      <Container>
        <div className={scss["home-about__inner"]}>
          <div className={scss["home-about__inner-block"]}>
            <div className={scss["home-about__info"]}>
              <AboutInfo
                title="За 10 лет я помог 200+ людям найти свой путь."
                desc={[
                  "В 2014 году я получил сертификат ICF и понял: коучинг — это не про наставничество. Это про создание пространства, где человек сам находит свой ответ.",
                  "Сегодня я работаю с первыми лицами компаний и командами. Моя задача — не сказать, как надо. А помочь услышать себя.",
                ]}
                philosophy={
                  "Я не даю советов. Я задаю вопросы. Правильные вопросы."
                }
                name={`${PERSON_CONFIG.name} ${PERSON_CONFIG.middlename}`}
                post={PERSON_CONFIG.post}
                quote="«Самое сложное в лидерстве — оставаться собой. Я помогаю в этом.»"
              />

              <div className={scss["home-about__items"]}>
                {ABOUT_STAT.map((stat) => {
                  return (
                    <div key={stat.label} className={scss["home-about__item"]}>
                      <p className="p1 font-text-italic">{stat.title}</p>

                      <p className="p3 gray-color-200">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className={scss["home-about__content"]}>
              <div className={scss["home-about__img-box"]}>
                <div className={scss["home-about__img"]}>
                  <Image
                    src={PERSON_CONFIG.images[0]}
                    alt={`Фотография ${PERSON_CONFIG.name} ${PERSON_CONFIG.middlename}`}
                  />
                </div>

                <div className={scss["home-about__img-textbox"]}>
                  <p className="p3">
                    "Коучинг — это партнерство, стимулирующее мыслительные и
                    творческие процессы."
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className={scss["home-about__footer"]}>
            <div className={scss["home-about__footer-items"]}>
              {ABOUT_ADVANTAGES.map((about_avvantages) => {
                const { icon, title, desc } = about_avvantages;

                return <CardIcon icon={icon} title={title} desc={[desc]} />;
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
