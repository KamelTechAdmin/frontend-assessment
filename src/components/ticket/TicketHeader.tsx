import { currentRequestTabAtom } from "@/atoms/TicketAtoms";
import { useTabs } from "@/hooks/useTabs";
import { useTabsMutations } from "@/hooks/useTabsMutation";
import { useAtom, type SetStateAction } from "jotai";
import { EllipsisVertical, Expand } from "lucide-react";
import type { Dispatch } from "react";

type TicketHeaderProps = {
  setIsFullScreen: Dispatch<SetStateAction<boolean>>;
};

export type TabType = {
  id: string;
  title: string;
  number: number;
};

const TicketHeader = ({ setIsFullScreen }: TicketHeaderProps) => {
  const [currentTabId] = useAtom(currentRequestTabAtom);

  const { data: tabs, isLoading, error } = useTabs();

  const currentTabData = tabs?.find((tab: TabType) => tab.id === currentTabId);

  const { update } = useTabsMutations();

  return (
    <div className="w-[827px] bg-white flex px-6 pb-6 mt-[25px]">
      {!isLoading && !error && (
        <div className="flex justify-between items-center w-full">
          <div className="flex justify-center gap-2">
            <div className="w-6 h-8 border border-[#7A8699] flex justify-center items-center rounded-lg p-0.5 cursor-pointer">
              <EllipsisVertical className="text-[#7A8699]" />
            </div>
            <div
              onClick={() => setIsFullScreen((prev) => !prev)}
              className="w-8 h-8 border border-[#7A8699] flex justify-center items-center rounded-lg p-2 cursor-pointer"
            >
              <Expand className="text-[#7A8699]" />
            </div>
            <div
              onClick={() => {
                update.mutate({
                  id: currentTabId,
                  modifiedData: {
                    isImportant: !currentTabData?.isImportant,
                  },
                });
              }}
              className="flex items-center justify-center gap-2 w-[102px] border border-[#7A8699] rounded-lg cursor-pointer"
            >
              <p className="text-[11px] text-[#7A8699]">
                {currentTabData?.isImportant ? "مهمه" : "تحويل لمهمة"}
              </p>
              <div className="relative ">
                <img src="/images/check.png" />
                <div className="absolute top-px left-1">
                  <img src="/images/checkmark.png" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 ml-3 ">
              <div className="w-8 h-8 flex justify-center items-center rounded-lg text-[#7A8699]">
                <img className="w-6 h-6" src="/images/circle-play.png" />
              </div>
              <div className="text-[#7A8699] text-[11px]">00:00:00</div>
            </div>
          </div>
          <h3 className="text-[#181C34] text-[18px] font-medium mr-4">
            {currentTabData?.title}
          </h3>
        </div>
      )}
    </div>
  );
};

export default TicketHeader;
