import { prisma } from "@/shared/lib/prisma";

import type { TeamItem } from "./team.types";

import type { Team as TeamRow } from "@prisma/client";

const mapTeam = (row: TeamRow): TeamItem => ({
  id: row.id,
  name: row.name,
  middlename: row.middlename,
  post: row.post,
  img: row.img,
  city: row.city ?? undefined,
  info: row.info,
  specializing: row.specializing,
  certification: row.certification,
  principle: row.principle,
  socials:
    row.telegram || row.vk
      ? {
          telegram: row.telegram ?? "",
          vk: row.vk ?? "",
        }
      : undefined,
});

export const getTeams = async (): Promise<TeamItem[]> => {
  const rows = await prisma.team.findMany({ orderBy: { createdAt: "asc" } });

  return rows.map(mapTeam);
};

export const getTeamById = async (id: string): Promise<TeamItem | null> => {
  const row = await prisma.team.findUnique({ where: { id } });

  return row ? mapTeam(row) : null;
};
