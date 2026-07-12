import { User, Users, Briefcase } from "lucide-react";

export const PROGRAM_ICON_KEYS = ["user", "users", "briefcase"] as const;

export type ProgramIconKey = (typeof PROGRAM_ICON_KEYS)[number];

export const PROGRAM_ICON_MAP: Record<ProgramIconKey, React.ReactNode> = {
  user: <User size="32" />,
  users: <Users size="32" />,
  briefcase: <Briefcase size="32" />,
};
