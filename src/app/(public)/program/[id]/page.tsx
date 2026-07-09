import { ProgramDetailPage } from "@/pages/program-detail";

interface ProgramDetaliProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProgramDetali({ params }: ProgramDetaliProps) {
  const { id } = await params;

  return <ProgramDetailPage idProgram={id}/>;
}
