import { createTab, deleteTab, updateTab } from "@/api/tabsApi";
import { requestTabsAtomType } from "@/atoms/TicketAtoms";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateTabInput = {
  id: string;
  modifiedData: Partial<requestTabsAtomType>;
};

export const useTabsMutations = () => {
  const queryClient = useQueryClient();

  const create = useMutation({
    mutationFn: createTab,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tabs"] });
    },
  });

  const remove = useMutation({
    mutationFn: deleteTab,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tabs"] });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, modifiedData }: UpdateTabInput) =>
      updateTab(id, modifiedData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tabs"] });
    },
  });

  return { create, remove, update };
};
