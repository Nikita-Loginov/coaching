import { apiClient } from "@/shared/api/client";

import type { ProgramFormValues } from "@/entities/program/model/program.schema";
import type { ProgramItem } from "@/entities/program/model/program.types";
import {
  mapFormToDb,
  mapProgram,
  ProgramFormData,
} from "@/entities/program/model/program.queries";
import { Prisma } from "@prisma/client";

import type { ProgramRow } from "@/entities/program/model/program.types";


export type ProgramRecord = ProgramFormValues & {
  createdAt: string;
  updatedAt: string;
};

export const programApi = {
  list: async (): Promise<ProgramItem[]> => {
    const { data } = await apiClient.get<ProgramRow[]>("admin/programs");
    return data.map(mapProgram);
  },
  get: async (id: string): Promise<ProgramItem> => {
    const { data } = await apiClient.get<ProgramRow>(`admin/programs/${id}`);
    return mapProgram(data);
  },
  create: async (payload: ProgramFormData): Promise<ProgramRow> => {
    const { data } = await apiClient.post<ProgramRow>(
      "admin/programs",
      payload
    );

    return mapProgram(data);
  },
  update: async (
    id: string,
    payload: ProgramFormData
  ): Promise<ProgramItem> => {
    const { data } = await apiClient.put<ProgramItem>(
      `admin/programs/${id}`,
      payload
    );

    return mapProgram(data);
  },
  delete: async (id: string): Promise<string> => {
    await apiClient.delete(`admin/programs/${id}`);
    return id;
  },
};
