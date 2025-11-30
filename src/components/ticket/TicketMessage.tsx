import {
  ChevronDown,
  ChevronUp,
  EllipsisVertical,
  Mail,
  Reply,
} from "lucide-react";
import { memo, useState } from "react";
import type { TicketMessageType } from "./TicketMessagesList";

type TicketMessageProps = {
  message: TicketMessageType;
};

const TicketMessage = ({ message }: TicketMessageProps) => {
  const [extended, setExtended] = useState(() => message.collapsed);
  return (
    <div
      className={`grid grid-cols-[1fr_40px] justify-end border 
      ${
        message.type === "customer"
          ? "border-[#E3E8EF]"
          : "border-[#00CA7C] bg-[#E9FFF3]"
      } 
        p-4 rounded-lg`}
    >
      <div className="flex flex-col">
        <div className="flex items-center gap-2 justify-end">
          <div className="flex items-center -ml-2 mr-auto">
            <EllipsisVertical className="text-[#7A8699] w-4 cursor-pointer" />
            <div
              className="cursor-pointer transition-all duration-300"
              onClick={() => setExtended((extended) => !extended)}
            >
              {extended ? (
                <ChevronUp className="text-[#7A8699]" />
              ) : (
                <ChevronDown className="text-[#7A8699]" />
              )}
            </div>
          </div>
          <p className="text-[#7A8699] font-normal text-[9px] leading-[13px] flex justify-end">
            {message.date && <span className="block mr-0.5">م</span>}
            <span className="block mr-3">{message.time}</span>
            {message.date && <span className="block">{message.date}</span>}
          </p>
          <h3 className="text-right">{message.name}</h3>
        </div>
        <div className="flex items-center gap-1 justify-end">
          <div className="text-[#98A2B2] flex gap-2 items-center text-[11px]">
            <div className="flex gap-1 items-center">
              {(message.email2 as string[]).map((cc: string, idx: number) => (
                <p key={idx}>&lt;{cc}&gt;,</p>
              ))}
            </div>

            <div>
              <Mail className="w-3" />
            </div>
            <p>موجهة إلي {message.name2}</p>
          </div>
          <div>
            <Reply className="text-[#98A2B2] w-5" />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <img src="images/user.png" />
      </div>
      {extended && (
        <p className="text-[11px] font-regular col-span-2 text-right mt-2">
          {message.text}
        </p>
      )}
    </div>
  );
};

export default memo(TicketMessage);
