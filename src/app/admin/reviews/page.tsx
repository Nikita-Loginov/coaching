import { ReviewAdminList } from "@/features/review/ui";
import AdminContent from "@/shared/ui/pages/admin-page";

export default function AdminReviews() {
  return (
    <AdminContent
      title="Отзывы"
      text="Управляйте отзывами"
      linkTo="/admin/reviews/new"
    >
      <ReviewAdminList />
    </AdminContent>
  );
}
