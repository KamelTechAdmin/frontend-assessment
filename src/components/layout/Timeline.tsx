import { ChevronLeft } from "lucide-react";
import { activeTimelinebarAtom } from "../../atoms/uiAtoms";
import { useAtom } from "jotai";

const timelineItems = [
  {
    id: "first",
    title: "أحدث الطلبات",
    image: "/images/timeline-1.png",
    time: "02:32",
    date: "22-09-2024",
    text: "قام @محمد صقر بإنشاء تذكره باسم نواجه مشكله في عدم عمل واجة المستخدم الحاليه ارجو الرد",
  },
  {
    id: "second",
    title: "أحدث الطلبات",
    image: "/images/timeline-2.png",
    time: "02:32",
    date: "22-09-2024",
    text: "قام @راشد فهد بالرد علي التذكره ب جاري العمل علي اصلاح المشكله",
  },
  {
    id: "third",
    title: "أحدث الطلبات",
    image: "/images/timeline-3.png",
    time: "02:32",
    date: "22-09-2024",
    text: "قام @العميل بالرد علي التذكره شاكرين لمجهوداتكم والرد السريع",
  },
  {
    id: "fourth",
    title: "أحدث الطلبات",
    image: "/images/timeline-4.png",
    time: "02:32",
    date: "22-09-2024",
    text: "قام @راشد فهد باضافة ملاحظه ب ارجو العمل علي حل المشكله باسرع ما يمكن",
  },
  {
    id: "fifth",
    title: "أحدث الطلبات",
    image: "/images/timeline-5.png",
    time: "02:32",
    date: "22-09-2024",
    text: "قام @محمد صقر بتغيير حاله التذكره من مفتوح الي مغلق",
  },
];

const Timeline = () => {
  const [isActive, setIsActive] = useAtom(activeTimelinebarAtom);

  return (
    <div className="relative border-r border-r-[#E3E8EF]">
      <div
        className={` 
         bg-white relative
        transition-all duration-300 overflow-hidden
        ${
          isActive
            ? "w-[236px] p-4 border-r border-[#E3E8EF]"
            : "w-0 p-0 border-r-0"
        }
        `}
      >
        <div className="flex justify-end gap-3 items-center  mb-8">
          <div className="border border-[#98A2B2] p-3 w-7 h-7 rounded-lg flex items-center justify-center">
            5
          </div>
          <h3 className="text-sm font-medium ">السجلات الزمنية</h3>
        </div>

        <div className="flex flex-col gap-4 text-right">
          {timelineItems.map((item, index) => {
            const isLast = index === timelineItems.length - 1;

            return (
              <div key={item.id} className="grid gap-x-2 grid-cols-[1fr_28px]">
                <div>
                  <h3 className="text-[#29304C] text-[12px] font-medium ">
                    {item.title}
                  </h3>

                  <p className="text-[#7A8699] font-normal text-[9px] leading-[13px] flex justify-end">
                    <span className="block mr-0.5">م</span>
                    <span className="block mr-3">{item.time}</span>
                    <span className="block">{item.date}</span>
                  </p>

                  <p className="text-[9px] text-[#29304C] mt-4">{item.text}</p>
                </div>
                <div className="relative flex flex-col items-center">
                  <img className="w-7 h-7 z-10" src={item.image} />
                  {!isLast && (
                    <div
                      className="
              absolute top-7 left-1/2 transform -translate-x-1/2
              w-px bg-[#d9e7ff] h-[calc(100%-0.5rem)]
              after:content-[''] after:absolute after:border-4
              after:border-transparent after:border-t-[#d9e7ff]
              after:bottom-0 after:left-1/2 after:-translate-x-1/2
            "
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div
        onClick={() => setIsActive((v) => !v)}
        className={`
          absolute top-[30px] ${
            !isActive ? "-left-3" : "-right-3"
          } z-50 cursor-pointer 
          w-6 h-6 bg-white border border-[#CBD5E1]
          rounded-full flex items-center justify-center shadow-sm
          transition-all duration-300
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
};

export default Timeline;
