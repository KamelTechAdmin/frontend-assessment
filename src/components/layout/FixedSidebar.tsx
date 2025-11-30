import {
  activeFixedSidebarAtom,
  activeFixedSidebarCollapseAtom,
} from "@/atoms/uiAtoms";
import { useAtom } from "jotai";
import { ChevronLeft } from "lucide-react";

const menu = [
  { id: 1, title: "اللوحة", image: "/images/board.png", name: "board" },
  { id: 2, title: "العملاء", image: "/images/clients.png", name: "clients" },
  { id: 3, title: "العقود", image: "/images/contracts.png", name: "contracts" },
  { id: 4, title: "الموارد البشرية", image: "/images/hr.png", name: "hr" },
  { id: 5, title: "المشاريع", image: "/images/projects.png", name: "projects" },
  { id: 6, title: "المالية", image: "/images/finances.png", name: "finances" },
  { id: 7, title: "التقويم", image: "/images/calender.png", name: "calender" },
  {
    id: 8,
    title: "الطلبات",
    image: "/images/requests.png",
    name: "requests",
    active: true,
  },
  {
    id: 9,
    title: "الإعدادات",
    image: "/images/settings.png",
    name: "settings",
  },
  { id: 10, title: "", image: "/images/user-photo.png", name: "profile" },
];

export default function FixedSidebar() {
  const [shownTab, setShownTab] = useAtom(activeFixedSidebarAtom);
  const [isActive, setIsActive] = useAtom(activeFixedSidebarCollapseAtom);

  const labels = {
    board: "اللوحة",
    clients: "العملاء",
    contracts: "العقود",
    hr: "الموارد البشرية",
    projects: "المشاريع",
    finances: "المالية",
    calender: "التقويم",
    requests: "الطلبات",
    settings: "الإعدادات",
    profile: "الحساب",
  };

  return (
    <div
      className={`
      relative bg-white border-l border-[#E2E8F0]
      transition-all duration-300 h-screen flex
      ${isActive ? "w-[273px]" : "w-[73px]"}
    `}
    >
      <div
        className={`
        transition-all duration-300 overflow-hidden
        ${isActive ? "w-[200px] opacity-100" : "w-0 opacity-0"}
      `}
      >
        <div className="py-2 pr-4 pl-20 mt-[25px] pb-[18px] border-b border-[#E2E8F0]">
          <h2 dir="rtl" className="text-[16px] font-semibold">
            {labels[shownTab] || ""}
          </h2>
        </div>

        <p
          dir="rtl"
          className="bg-[#F7F8FA] h-[45px] text-[12px] text-[#29304C]
          py-2 pr-4 pl-20 flex items-center
        "
        >
          {labels[shownTab] || ""}
        </p>
      </div>

      <div className="w-[73px] border-r border-l border-[#E3E8EF] bg-white flex flex-col justify-between">
        <nav className="mt-[93px] flex flex-col items-center">
          {menu.map((item) => (
            <div
              key={item.id}
              onClick={() => setShownTab(item.name)}
              className={`flex flex-col items-center ${
                item.id === 10 ? "py-1" : "py-3"
              } cursor-pointer`}
            >
              <img
                className={`${item.id === 10 ? "w-[45px]" : "w-[40px]"}`}
                src={item.image}
              />
              <p
                className={`text-[9px] ${
                  item.name === shownTab ? "font-black" : "font-normal"
                }`}
              >
                {item.title}
              </p>
            </div>
          ))}
        </nav>
      </div>

      <div
        onClick={() => setIsActive((v) => !v)}
        className={`
          absolute top-[760px] rotate-180 z-50 cursor-pointer 
          w-6 h-6 bg-white border border-[#CBD5E1]
          rounded-full flex items-center justify-center shadow-sm
          transition-all duration-300
          ${isActive ? "-left-3" : "right-15"}
        `}
      >
        <ChevronLeft
          className={`
            w-6 h-6 text-[#475370] stroke-[1.3]
            transition-transform duration-300
            ${isActive ? "" : "rotate-180"}
          `}
        />
      </div>
    </div>
  );
}
