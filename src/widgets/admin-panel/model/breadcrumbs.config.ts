export interface BreadcrumbItem {
  href: string;
  label: string;
}

export const BREADCRUMB_MAP: Record<string, BreadcrumbItem[]> = {
  "/admin": [
    { href: "/", label: "Главная" },
    { href: "/admin", label: "Админка" },
  ],

  "/admin/reviews": [
    { href: "/", label: "Главная" },
    { href: "/admin/reviews", label: "Отзывы" },
  ],

  "/admin/programs": [
    { href: "/", label: "Главная" },
    { href: "/admin/programs", label: "Программы" },
  ],

  "/admin/team": [
    { href: "/", label: "Главная" },
    { href: "/admin/team", label: "Команда" },
  ],
};
