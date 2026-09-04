"use client";

import type { ProgramItem } from "@/entities/program/model/program.types";

import { useProgramsQuery } from "../../model/useProgramsQuery";
import { useDeleteProgram } from "../../model/useProgramMutations";
import { useReorderPrograms } from "../../model/useReorderPrograms";

import { SortableAdminList } from "@/shared/ui/pages/admin-page/ui/sortable-admin-list/SortableAdminList";

import { SortableProgramCard } from "../sortable-program-card/SortableProgramCard";

export const ProgramAdminList = () => {
  const { data: programs, isLoading } = useProgramsQuery();

  const deleteProgram = useDeleteProgram();
  const reorderPrograms = useReorderPrograms();

  if (isLoading) {
    return <p>Загрузка программ...</p>;
  }

  if (!programs || programs.length === 0) {
    return <p className="p2">Программ пока нет</p>;
  }

  return (
    <SortableAdminList<ProgramItem>
      items={programs}
      onReorder={(items) => {
        reorderPrograms.mutate(items);
      }}
      renderItem={(program) => (
        <SortableProgramCard
          key={program.id}
          program={program}
          onDelete={(id) => deleteProgram.mutate(id)}
          deleteStatus={{
            isPending: deleteProgram.isPending,
            id: deleteProgram.variables,
          }}
        />
      )}
    />
  );
};