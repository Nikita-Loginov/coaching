"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useEffect, useState } from "react";

import { useProgramsQuery } from "../../model/useProgramsQuery";

import { AdminItems } from "@/shared/ui/pages/admin-page";

import type { ProgramItem } from "@/entities/program/model/program.types";

import { useDeleteProgram } from "../../model/useProgramMutations";

import { useReorderPrograms } from "../../model/useReorderPrograms";

import { SortableProgramCard } from "../sortable-program-card/SortableProgramCard";

export const ProgramAdminList = () => {
  const { data: programs, isLoading } = useProgramsQuery();

  const deleteProgram = useDeleteProgram();
  const reorderPrograms = useReorderPrograms();

  const [items, setItems] = useState<ProgramItem[]>([]);

  useEffect(() => {
    if (programs) {
      setItems(programs);
    }
  }, [programs]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  if (isLoading) return <p>Загрузка программ...</p>;

  if (!programs || programs.length === 0) {
    return <p className="p2">Программ пока нет</p>;
  }

  const handleDragEnd = ({ active, over }: any) => {
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex((item) => item.id === active.id);

    const newIndex = items.findIndex((item) => item.id === over.id);

    const updated = arrayMove(items, oldIndex, newIndex);

    setItems(updated);

    reorderPrograms.mutate(
      updated.map((item, index) => ({
        id: item.id,
        order: index,
      }))
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <AdminItems>
          {items.map((program) => (
            <SortableProgramCard
              key={program.id}
              program={program}
              onDelete={(id) => deleteProgram.mutate(id)}
              deleteStatus={{
                isPending: deleteProgram.isPending,
                id: deleteProgram.variables,
              }}
            />
          ))}
        </AdminItems>
      </SortableContext>
    </DndContext>
  );
};
