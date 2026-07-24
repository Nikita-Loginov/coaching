import { ReviewAdminForm } from "@/features/review/ui";

interface AdminReviewEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminTeamEditPage({
  params,
}: AdminReviewEditPageProps) {
  const { id } = await params;

  return <ReviewAdminForm mode="edit" id={id} />;
}
