import { apiClient } from "@/shared/api/client";

import type { ProgramFormValues } from "@/entities/program/model/program.schema";
import type { ProgramItem } from "@/entities/program/model/program.types";
import { mapFormToDb, mapProgram, ProgramFormData } from "@/entities/program/model/program.queries";

import type { Program as ProgramRow } from "@prisma/client";

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
  create: async (payload: ProgramFormData): Promise<ProgramItem> => {
    const dbPayload = mapFormToDb(payload);
    const { data } = await apiClient.post<ProgramRow>("/admin/programs", dbPayload);
    return mapProgram(data);
  },
  delete: async (id: string): Promise<string> => {
    await apiClient.delete(`admin/programs/${id}`);
    return id;
  },
};
