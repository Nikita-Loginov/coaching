"use client";

import { ProgramCard } from "@/entities/program/ui";

import { useProgramsQuery } from "../../model/useProgramsQuery";

import { AdminItems } from "@/pages/admin-page";

export const ProgramAdminList = () => {
  const { data: programs, isLoading } = useProgramsQuery();

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
              />
            );
          })}
        </>
      ) : null}
    </AdminItems>
  );
};
