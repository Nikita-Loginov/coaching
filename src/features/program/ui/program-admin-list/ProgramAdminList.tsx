"use client";

import { ProgramCard } from "@/entities/program/ui";

import { useProgramsQuery } from "../../model/useProgramsQuery";

import { AdminItems } from "@/shared/ui/pages/admin-page";
import { useDeleteProgram } from "../../model/useProgramMutations";

export const ProgramAdminList = () => {
  const { data: programs, isLoading } = useProgramsQuery();
  const deleteProgram = useDeleteProgram();

  if (isLoading) return <p>Загрузка программ...</p>;

  if (!programs || programs.length === 0) {
    return <p className="p2">Программ пока нет</p>;
  }

  return (
    <AdminItems>
      {programs.length > 0 ? (
        <>
          {programs.map((program) => {
            return (
              <ProgramCard
                key={program.id}
                card={{ ...program }}
                variant="admin"
                onDelete={(id) => {
                  deleteProgram.mutate(id)
                }}
                deleteStatus={{
                  isPending: deleteProgram.isPending,
                  id: deleteProgram.variables,
                }}
              />
            );
          })}
        </>
      ) : null}
    </AdminItems>
  );
};
