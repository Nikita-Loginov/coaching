import { Container, TopInner } from "@/shared/ui";

import { ProgramCard } from "@/entities/program/ui";

import { getPrograms } from "@/entities/program/model/program.queries";

import scss from "./ProgramsSection.module.scss";


export const ProgramsSection = async () => {
  const programs = await getPrograms();
  
  return (
    <section className={scss["programs"]} id="programs">
      <Container>
        <TopInner
          title="Программы коучинга"
          desc={["Индивидуально. Для команд. Для первых лиц."]}
        >
          {programs.length > 0 ? (
            <div className={scss["programs__items"]}>
              {programs.map((program) => {
                return <ProgramCard key={program.id} card={{ ...program }} />;
              })}
            </div>
          ) : null}
        </TopInner>
      </Container>
    </section>
  );
};
