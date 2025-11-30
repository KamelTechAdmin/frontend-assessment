import { getAllTabs } from "@/api/tabsApi";
import { useQuery } from "@tanstack/react-query";

export function useTabs() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tabs"],
    queryFn: getAllTabs,
  });

  return { data, isLoading, error };
}
