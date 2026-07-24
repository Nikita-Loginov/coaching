"use client";

import { TeamCard } from "@/entities/team/ui";

import { useTeamsQuery } from "../../model/useTeamsQuery";

import { AdminItems } from "@/shared/ui/pages/admin-page";
import { useDeleteTeam } from "../../model/useTeamMutations";

export const TeamAdminList = () => {
  const { data: teams, isLoading } = useTeamsQuery();
  const deleteTeam = useDeleteTeam();

  if (isLoading) return <p>Загрузка команды...</p>;

  if (!teams || teams.length === 0) {
    return <p className="p2">Команды пока нет</p>;
  }

  return (
    <AdminItems>
      {teams.length > 0 ? (
        <>
          {teams.map((team) => {
            return (
              <TeamCard
                key={team.id}
                item={{ ...team }}
                variant="admin"
                onDelete={(id) => {
                  deleteTeam.mutate(id)
                }}
                deleteStatus={{
                  isPending: deleteTeam.isPending,
                  id: deleteTeam.variables,
                }}
              />
            );
          })}
        </>
      ) : null}
    </AdminItems>
  );
};
