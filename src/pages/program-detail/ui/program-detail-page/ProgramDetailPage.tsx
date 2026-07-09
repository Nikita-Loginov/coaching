import { Container } from "@/shared/ui";

import { ProgramDetailTop } from "../program-detail-top/ProgramDetailTop";
import { ProgramDetailInfo } from "../program-detail-info/ProgramDetailInfo";

import { PROGRAMS_ITEMS } from "@/shared/config/programs/programs-items.config";

import { ReviewsSection } from "@/widgets/reviews";

import scss from "./ProgramDetailPage.module.scss";

interface ProgramDetailPageProps {
  idProgram: string;
}

export const ProgramDetailPage = ({ idProgram }: ProgramDetailPageProps) => {
  const program = PROGRAMS_ITEMS.find(
    (program) => program.id.toString() === idProgram.toString()
  );

  if (!program) return;

  return (
    <>
      <section className={scss["program-detail-hero"]}>
        <Container>
          <div className={scss["program-detail-hero__inner"]}>
            <ProgramDetailTop program={program} />

            <ProgramDetailInfo program={program}/>
          </div>
        </Container>
      </section>

      <ReviewsSection title="Отзывы о программе" desc={["Результаты наших клиентов"]} targetType="program" />
    </>
  );
};
