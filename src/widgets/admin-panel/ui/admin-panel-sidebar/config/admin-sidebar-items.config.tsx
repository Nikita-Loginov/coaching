import { BookOpen, LucideIcon, MessageSquare, Users } from "lucide-react";

type ItemType = {
  to: string;
  label: string;
  icon: LucideIcon;
};

export const ADMIN_SIDEBAR_ITEMS: ItemType[] = [
  { to: "/admin/programs", label: "Программы", icon: BookOpen },
  { to: "/admin/teams", label: "Команда", icon: Users },
  { to: "/admin/reviews", label: "Отзывы", icon: MessageSquare },
];
