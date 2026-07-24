import { TeamItem, TeamRow } from "./team.types";

export const mapTeam = (row: TeamRow): TeamItem => ({
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
