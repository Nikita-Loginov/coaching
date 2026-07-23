import { AdminContent, AdminItems } from "@/shared/ui/pages/admin-page";

import { ProgramAdminList } from "@/features/program/ui";

export default function AdminPrograms() {
  return (
    <AdminContent
      title="Программы"
      text="Управляйте программами коучинга"
      linkTo="/admin/programs/new"
    >
      <ProgramAdminList />
    </AdminContent>
  );
}
