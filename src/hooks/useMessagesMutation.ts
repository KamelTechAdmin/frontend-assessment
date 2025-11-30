import { createMessage } from "@/api/messagesApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMessagesMutation = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: createMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });

  return { create };
};
