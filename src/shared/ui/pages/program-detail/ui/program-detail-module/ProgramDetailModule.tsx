import classNames from "classnames";

import type { ProgramModule } from "@/entities/program/model/program.types";

import scss from "./ProgramDetailModule.module.scss";

interface ProgramDetailModuleProps {
  curriculum: ProgramModule[];
}

export const ProgramDetailModule = ({
  curriculum,
}: ProgramDetailModuleProps) => {
  return (
    <ul className={scss["program-detail-module"]}>
      {curriculum.map((module, index) => {
        const moduleNumber = index + 1;
        const isLast = index === curriculum.length - 1;

        return (
          <li key={index} className={scss["program-detail-module__item"]}>
            <div className={scss["program-detail-module__item-decor"]}>
              <div className={scss["program-detail-module__item-circle"]}>
                <div
                  className={scss["program-detail-module__item-circle-number"]}
                >
                  {moduleNumber}
                </div>
              </div>

              {!isLast && (
                <div className={scss["program-detail-module__item-line"]} />
              )}
            </div>

            <div className={scss["program-detail-module__item-content"]}>
              <p className={scss["program-detail-module__item-title"]}>
                {module.title}
              </p>

              <div
                className={classNames(
                  "textbox",
                  scss["program-detail-module__textbox"]
                )}
              >
                <p className="p3">{module.description}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default ProgramDetailModule;
