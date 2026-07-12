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

// export const useUpdateProgram = (id: string) => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (data: Omit<ProgramFormValues, "id">) =>
//       programApi.update(id, data),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: PROGRAMS_QUERY_KEY });
//     },
//   });
// };

// export const useDeleteProgram = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (id: string) => programApi.remove(id),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: PROGRAMS_QUERY_KEY });
//     },
//   });
// };
