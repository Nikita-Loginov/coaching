import { useMutation, useQueryClient } from "@tanstack/react-query";

import { programApi } from "./program.api";
import { PROGRAMS_QUERY_KEY } from "./useProgramsQuery";

import type { ProgramFormValues } from "@/entities/program/model/program.schema";
import { ProgramFormData } from "@/entities/program/model/program.queries";

export const useCreateProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ProgramFormData) => programApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROGRAMS_QUERY_KEY });
    },
  });
};

export const useUpdateProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProgramFormData }) =>
      programApi.update(id, data),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PROGRAMS_QUERY_KEY,
      });
    },
  });
};

export const useDeleteProgram = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => programApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROGRAMS_QUERY_KEY });
    },
  });
};
