import { BookOpen, MessageSquare, Users } from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS = [
  { to: "/admin/programs", label: "Программы", icon: BookOpen },
  { to: "/admin/teams", label: "Команда", icon: Users },
  { href: "/admin/reviews", label: "Отзывы", icon: MessageSquare },
];
