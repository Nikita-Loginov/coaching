import { User, Users, Briefcase } from "lucide-react";

export const PROGRAM_ICON_KEYS = ["user", "users", "briefcase"] as const;

export type ProgramIconKey = (typeof PROGRAM_ICON_KEYS)[number];

export const PROGRAM_ICON_MAP: Record<ProgramIconKey, React.ReactNode> = {
  user: <User />,
  users: <Users />,
  briefcase: <Briefcase />,
};

export const PROGRAM_ICON_LABELS: Record<ProgramIconKey, string> = {
  user: "Пользователь",
  users: "Команда",
  briefcase: "Портфель",
};

