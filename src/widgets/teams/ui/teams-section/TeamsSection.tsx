import { Container, TopInner, Swiper } from "@/shared/ui";

import { TeamCard } from "@/entities/team/ui";

import { TEAMS_ITEMS } from "@/shared/config/teams/teams-items.config";

import scss from "./TeamsSection.module.scss";

export const TeamsSection = () => {
  if (TEAMS_ITEMS.length < 1) return;

  const items = TEAMS_ITEMS.map((team) => {
    return <TeamCard key={team.id} item={team} />;
  });

  return (
    <section className={scss["teams"]}>
      <Container>
        <TopInner
          title="Профессионалы своего дела"
          desc={["Каждый коуч прошёл строгий отбор и разделяет ценности ICF"]}
        >
          <Swiper
            config={{
              spaceBetween: 32,
              slidesPerView: 3.5,
            }}
            items={items}
            pagination
          ></Swiper>
        </TopInner>
      </Container>
    </section>
  );
};
