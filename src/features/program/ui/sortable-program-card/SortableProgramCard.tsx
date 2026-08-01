"use client";

import classNames from "classnames";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { ProgramCard } from "@/entities/program/ui";

import type { ProgramItem } from "@/entities/program/model/program.types";

import scss from "./SortableProgramCard.module.scss";

interface SortableProgramCardProps {
  program: ProgramItem;

  onDelete?: (id: string) => void;

  deleteStatus?: {
    isPending: boolean;
    id?: string;
  };
}

export const SortableProgramCard = ({
  program,
  onDelete,
  deleteStatus,
}: SortableProgramCardProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: program.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      className={classNames(scss["sortable-program-card"], {
        [scss["sortable-program-card--dragging"]]: isDragging,
      })}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <ProgramCard
        card={program}
        variant="admin"
        onDelete={onDelete}
        deleteStatus={deleteStatus}
      />
    </div>
  );
};
