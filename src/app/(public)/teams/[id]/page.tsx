import { TeamDetailPage } from "@/pages/team-detail";

interface TeamDetaliProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function TeamDetali({ params }: TeamDetaliProps) {
  const { id } = await params;

  return <TeamDetailPage teamId={id}/>;
}
