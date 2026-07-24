import { Container } from "@/shared/ui";

import { TeamDetailInfo } from "../team-detail-info/TeamDetailInfo";

import { getTeamById } from "@/entities/team/model/team.queries";

import scss from "./TeamDetailPage.module.scss";

interface TeamDetailPageProps {
  teamId: string;
}

export const TeamDetailPage = async ({ teamId }: TeamDetailPageProps) => {
  // console.log(teamId)
  const team = await getTeamById(teamId);

  if (!team) return;

  return (
    <section className={scss["team-detail-page"]}>
      <Container>
        <div className={scss["team-detail-page__inner"]}>
          <TeamDetailInfo team={team} />
        </div>
      </Container>
    </section>
  );
};

export default TeamDetailPage;
