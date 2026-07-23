import { Container } from "@/shared/ui";

import { TEAMS_ITEMS } from "@/shared/config/teams/teams-items.config";

import { TeamDetailInfo } from "../team-detail-info/TeamDetailInfo";

import scss from "./TeamDetailPage.module.scss";

interface TeamDetailPageProps {
  teamId: string;
}

export const TeamDetailPage = ({ teamId }: TeamDetailPageProps) => {
  const team = TEAMS_ITEMS.find(
    (team) => team.id.toString() === teamId.toString()
  );

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

export default TeamDetailPage
