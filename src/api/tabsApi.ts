import { requestTabsAtomType } from "@/atoms/TicketAtoms";
import { TabType } from "@/components/ticket/TicketHeader";
import api from "@/lib/axios";

export const getAllTabs = async () => {
  const res = await api.get("/tabs");
  return res.data;
};

export const createTab = async (tab: TabType) => {
  const res = await api.post("/tabs", tab);
  return res.data;
};

export const deleteTab = async (id: string) => {
  const res = await api.delete(`/tabs/${id}`);
  return res.data;
};

export const updateTab = async (
  id: string,
  modifiedData: Partial<requestTabsAtomType>
) => {
  const res = await api.patch(`/tabs/${id}`, modifiedData);
  return res.data;
};
