import { useAtom } from "jotai";
import TicketMessage from "./TicketMessage";
import { currentRequestTabAtom, TicketMessageType } from "@/atoms/TicketAtoms";
import { useMessages } from "@/hooks/useMessages";

type TicketMessagesList = {
  isFullScreen: boolean;
};

const TicketMessagesList = ({ isFullScreen }: TicketMessagesList) => {
  const [currentTab] = useAtom(currentRequestTabAtom);

  const { data: AllMessagesList, isLoading, error } = useMessages(currentTab);

  const currentTicketMessages = AllMessagesList ?? [];

  return (
    <div
      className={`custom-scroll flex flex-col gap-4 pb-4 px-6 bg-white overflow-y-auto w-[827px] ${
        isFullScreen ? "h-full border-0" : "h-[320px] border-r border-[#E3E8EF]"
      } `}
    >
      {isLoading && (
        <div className="flex justify-center mt-10 text-gray-500 text-sm">
          جاري التحميل...
        </div>
      )}
      {error && (
        <div className="flex justify-center mt-10 text-gray-500 text-sm">
          حدث خطأ أثناء التحميل...
        </div>
      )}

      {currentTicketMessages.length > 0 &&
        !isLoading &&
        !error &&
        currentTicketMessages.map((item: TicketMessageType) => (
          <TicketMessage key={item.id} message={item} />
        ))}

      {!isLoading && !error && currentTicketMessages.length === 0 && (
        <div className="flex justify-center mt-10 text-gray-400 text-sm">
          لا توجد رسائل بعد
        </div>
      )}
    </div>
  );
};

export default TicketMessagesList;
