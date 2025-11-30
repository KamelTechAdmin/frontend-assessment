import { activeSidebarAtom } from "../../../src/atoms/uiAtoms";
import { useAtom } from "jotai";

const sidebarItems = [
  {
    id: "actions",
    label: "الإجراءات",
    icon: "/images/arrows.png",
  },
  {
    id: "contact",
    label: "بيانات الاتصال",
    icon: "/images/person.png",
  },
  {
    id: "tickets",
    label: "تذاكر مرتبطة",
    icon: "/images/mail.png",
  },
  {
    id: "details",
    label: "التفاصيل",
    icon: "/images/file.png",
  },
  {
    id: "timeline",
    label: "السجلات الزمنية",
    icon: "/images/green-flag.png",
  },
];

const Sidebar = () => {
  const [active, setActive] = useAtom(activeSidebarAtom);

  return (
    <div className="w-20 min-h-screen bg-white border-r border-l border-[#E3E8EF] flex flex-col items-center py-4 gap-5">
      {sidebarItems.map((item) => (
        <div
          key={item.id}
          onClick={() => setActive(item.id)}
          className="flex flex-col justify-center items-center cursor-pointer"
        >
          <img className="w-10 h-10" src={item.icon} />
          <p
            className={`text-[8px] ${
              active === item.id ? "text-[#29304C]" : "text-[#98A2B2]"
            } text-center`}
          >
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
