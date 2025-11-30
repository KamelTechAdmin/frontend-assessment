import { getAllMessages } from "@/api/messagesApi";
import { useQuery } from "@tanstack/react-query";

export function useMessages(tabId: string) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["messages", tabId],
    queryFn: () => getAllMessages(tabId),
    enabled: !!tabId,
  });

  return { data, isLoading, error };
}
