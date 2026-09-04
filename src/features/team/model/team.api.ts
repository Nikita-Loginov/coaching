import { apiClient } from "@/shared/api/client";
import type { TeamFormValues } from "@/entities/team/model/team.schema";
import type { TeamItem } from "@/entities/team/model/team.types";

type TeamRow = any;

export type TeamRecord = Omit<TeamFormValues, "city" | "telegram" | "vk"> & {
  city: string | null;
  telegram: string | null;
  vk: string | null;
  createdAt: string;
  updatedAt: string;
};

const mapTeamRowToItem = (row: TeamRow): TeamItem => ({
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
  socials: {
    telegram: row.telegram ?? "",
    vk: row.vk ?? "",
  },
});

const mapItemToRow = (
  data: TeamFormValues
): Omit<TeamRow, "createdAt" | "updatedAt"> => ({
  id: data.id,
  name: data.name,
  middlename: data.middlename,
  post: data.post,
  img: data.img,
  city: data.city ?? null,
  info: data.info,
  specializing: data.specializing,
  certification: data.certification,
  principle: data.principle,
  telegram: data.telegram ?? null,
  vk: data.vk ?? null,
});

export const teamApi = {
  list: async (): Promise<TeamItem[]> => {
    const { data } = await apiClient.get<TeamRow[]>("admin/teams");
    return data.map(mapTeamRowToItem);
  },

  get: async (id: string): Promise<TeamItem> => {
    const { data } = await apiClient.get<TeamRow>(`admin/teams/${id}`);
    return mapTeamRowToItem(data);
  },

  create: async (data: TeamFormValues): Promise<TeamItem> => {
    const payload = {
      id: data.id,
      ...mapItemToRow(data),
    };

    const { data: created } = await apiClient.post<TeamRow>(
      "admin/teams",
      payload
    );

    return mapTeamRowToItem(created);
  },

  update: async (
    currentId: string,
    data: TeamFormValues
  ): Promise<TeamItem> => {
    const payload = mapItemToRow(data);

    const { data: updated } = await apiClient.patch<TeamRow>(
      `admin/teams/${currentId}`,
      payload
    );

    return mapTeamRowToItem(updated);
  },

  remove: async (id: string): Promise<void> => {
    await apiClient.delete(`admin/teams/${id}`);
  },

  reorder: async (
    items: {
      id: string;
      order: number;
    }[]
  ) => {
    const response = await apiClient.put("admin/teams/reorder", {
      items,
    });

    return response.data;
  },
};
