import { useMutation, useQueryClient } from "@tanstack/react-query";
import { programApi } from "./program.api";
import { PROGRAMS_QUERY_KEY } from "./useProgramsQuery";

export const useReorderPrograms = () => {
  return useMutation({
    mutationFn: (
      items: {
        id: string;
        order: number;
      }[]
    ) => programApi.reorder(items),
  });
};
