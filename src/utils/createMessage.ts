import { v4 as uuidv4 } from "uuid";
import type { TicketMessageType } from "@/atoms/TicketAtoms";

export function createMessage({
  text,
  ccList,
  date,
  time,
}: {
  text: string;
  ccList: string[];
  date: string;
  time: string;
}): TicketMessageType {
  return {
    id: uuidv4(),
    type: "staff",
    collapsed: false,
    name: "محمد صقر",
    name2: "راشد فهد",
    date,
    time,
    email1: "ahmed@example.com",
    email2: ccList,
    text,
  };
}
