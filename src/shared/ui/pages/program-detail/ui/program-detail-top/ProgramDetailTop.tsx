import type { ProgramItem } from "@/entities/program/model/program.types";

import scss from "./ProgramDetailTop.module.scss";

interface ProgramDetailTopProps {
  program: ProgramItem;
}

export const ProgramDetailTop = ({
  program: { name, description },
}: ProgramDetailTopProps) => {
  if (!name || !description) return;

  return (
    <div className={scss["program-detail-top"]}>
      {name && <h1 className="h2">{name}</h1>}

      {description && <p className="p3 gray-color-200">{description}</p>}
    </div>
  );
};

export default ProgramDetailTop;
