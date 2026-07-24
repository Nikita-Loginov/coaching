import { Container, TopInner, Swiper } from "@/shared/ui";

import { TeamCard } from "@/entities/team/ui";

import { getTeams } from "@/entities/team/model/team.queries";

import scss from "./TeamsSection.module.scss";

export const TeamsSection = async () => {
  const teams = await getTeams();

  if (teams.length < 1) return;

  const items = teams.map((team) => {
    return <TeamCard key={team.id} item={team} />;
  });

  return (
    <section className={scss["teams"]} id="teams">
      <Container>
        <TopInner
          title="Профессионалы своего дела"
          desc={["Каждый коуч прошёл строгий отбор и разделяет ценности ICF"]}
        >
          <Swiper
            config={{
              spaceBetween: 16,
              slidesPerView: 1,
              breakpoints: {
                1023: {
                  slidesPerView: 3.5,
                  spaceBetween: 32,
                },
                767: {
                  slidesPerView: 2.5,
                },
                600: {
                  slidesPerView: 1.5,
                },
              },
            }}
            items={items}
            pagination
          ></Swiper>
        </TopInner>
      </Container>
    </section>
  );
};
