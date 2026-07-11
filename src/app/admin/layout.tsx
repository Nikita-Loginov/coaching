import { AdminPanelLayout } from "@/widgets/admin-panel/ui";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <AdminPanelLayout>{children}</AdminPanelLayout>
  );
}
