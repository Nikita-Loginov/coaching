import { AdminContent, AdminItems } from "@/shared/ui/pages/admin-page";

import { TeamAdminList } from "@/features/team/ui";

export default function AdminTeams() {
  return (
    <AdminContent
      title="Команда"
      text="Управляйте командой"
      linkTo="/admin/teams/new"
    >
      <TeamAdminList />
    </AdminContent>
  );
}
