import { TicketMessageType } from "@/atoms/TicketAtoms";
import api from "@/lib/axios";

export const getAllMessages = async (tabId: string) => {
  const res = await api.get(`/messages?tabId=${tabId}`);
  return res.data;
};

export const createMessage = async (message: TicketMessageType) => {
  const res = await api.post("/messages", message);
  return res.data;
};
