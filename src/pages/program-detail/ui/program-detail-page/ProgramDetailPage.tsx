import { Container } from "@/shared/ui";

import { ProgramDetailTop } from "../program-detail-top/ProgramDetailTop";
import { ProgramDetailInfo } from "../program-detail-info/ProgramDetailInfo";

import { getProgramById } from "@/entities/program/model/program.queries";

import { ReviewsSection } from "@/widgets/reviews";

import scss from "./ProgramDetailPage.module.scss";

interface ProgramDetailPageProps {
  idProgram: string;
}

export const ProgramDetailPage = async ({ idProgram }: ProgramDetailPageProps) => {
  const program = await getProgramById(idProgram);

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
