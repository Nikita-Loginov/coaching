import { Container, TopInner } from "@/shared/ui";

import { ProgramCard } from "@/entities/program/ui";

import { PROGRAMS_ITEMS } from "@/shared/config/programs/programs-items.config";

import scss from "./ProgramsSection.module.scss";

export const ProgramsSection = () => {
  return (
    <section className={scss["programs"]} id="programs">
      <Container>
        <TopInner
          title="Программы коучинга"
          desc={["Индивидуально. Для команд. Для первых лиц."]}
        >
          {PROGRAMS_ITEMS.length > 0 ? (
            <div className={scss["programs__items"]}>
              {PROGRAMS_ITEMS.map((program) => {
                return <ProgramCard key={program.id} card={{ ...program }} />;
              })}
            </div>
          ) : null}
        </TopInner>
      </Container>
    </section>
  );
};
