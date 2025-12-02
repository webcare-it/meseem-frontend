import { useQuery } from "@tanstack/react-query";
import { apiClient } from "../../lib/api-client";
import type { QueryType } from "../utils/type";

export const useGetLanguages = (): QueryType => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get_languages"],
    queryFn: async () => {
      const response = await apiClient.get("/languages");
      return response.data;
    },
  });

  return { data, isLoading, error };
};
