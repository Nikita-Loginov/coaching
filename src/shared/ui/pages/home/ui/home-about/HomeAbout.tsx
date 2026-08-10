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
                title="Помогать группам сильных людей становиться сильными командами."
                desc={[
                  "Более 10 лет я работаю с руководителями и командами, помогая им становиться эффективнее: лучше понимать друг друга, договариваться, проходить через изменения и находить собственные способы достижения амбициозных целей.",
                  "В моей практике — командный и индивидуальный коучинг, стратегические сессии, развитие руководителей и корпоративные образовательные программы.",
                ]}
                philosophy={
                  "Я — Алексей Киселев, командный коуч, фасилитатор, бизнес-тренер."
                }
                name={`${PERSON_CONFIG.name} ${PERSON_CONFIG.middlename}`}
                post={PERSON_CONFIG.post}
                quote="«Для меня командный коучинг — это возможность помочь команде найти собственные решения и превратить их в общие результаты.»"
              />

              <div className={scss["home-about__items"]}>
                {ABOUT_STAT.map((stat) => {
                  const {label, subtitle, title} = stat;

                  return (
                    <div key={label} className={scss["home-about__item"]}>
                      <p className="p1 font-text-italic">
                        {title} {subtitle ? <span className="p4">{subtitle}</span> : null}
                      </p>

                      <p className="p3 gray-color-200">{label}</p>
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
                    "Хороший результат моей работы — команда, которой со
                    временем я становлюсь не нужен"
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

export default HomeAbout;
