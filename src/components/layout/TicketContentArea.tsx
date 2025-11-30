import { useState } from "react";
import ReplyBar from "../ticket/ReplyBar";
import TicketHeader from "../ticket/TicketHeader";
import TicketMessagesList from "../ticket/TicketMessagesList";
import { currentRequestTabAtom } from "@/atoms/TicketAtoms";
import { useAtom } from "jotai";

const TicketContentArea = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentTabId] = useAtom(currentRequestTabAtom);

  return (
    <div>
      <div
        className={`${
          isFullScreen
            ? "flex flex-col justify-center items-center inset-0 z-1000 fixed w-full h-full bg-white"
            : ""
        } `}
      >
        {parseInt(currentTabId) > 0 && (
          <>
            <TicketHeader setIsFullScreen={setIsFullScreen} />
            <TicketMessagesList isFullScreen={isFullScreen} />
          </>
        )}
      </div>
      <ReplyBar />
    </div>
  );
};

export default TicketContentArea;
