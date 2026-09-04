"use client";

import type { TeamItem } from "@/entities/team/model/team.types";

import { TeamCard } from "@/entities/team/ui";

import { useTeamsQuery } from "../../model/useTeamsQuery";
import { useDeleteTeam } from "../../model/useTeamMutations";
import { useReorderTeams } from "../../model/useReorderTeams";

import { SortableTeamCard } from "../sortable-team-card/SortableTeamCard";

import { SortableAdminList } from "@/shared/ui/pages/admin-page/ui/sortable-admin-list/SortableAdminList";

export const TeamAdminList = () => {
  const { data: teams, isLoading } = useTeamsQuery();

  const deleteTeam = useDeleteTeam();
  const reorderTeams = useReorderTeams();

  if (isLoading) {
    return <p>Загрузка команды...</p>;
  }

  if (!teams || teams.length === 0) {
    return <p className="p2">Команды пока нет</p>;
  }

  return (
    <SortableAdminList<TeamItem>
      items={teams}
      onReorder={(items) => {
        reorderTeams.mutate(items);
      }}
      renderItem={(team) => (
        <SortableTeamCard
          key={team.id}
          team={team}
          onDelete={(id) => deleteTeam.mutate(id)}
          deleteStatus={{
            isPending: deleteTeam.isPending,
            id: deleteTeam.variables,
          }}
        />
      )}
    />
  );
};
