import { StickyNote } from "lucide-react";

const Navbar = () => {
  return (
    <nav>
      <div
        dir="rtl"
        className="flex justify-between items-center border-b border-[#E2E8F0] py-4 pt-8"
      >
        <h2 className="text-[18px] font-medium text-[#181C34] pr-7">الطلبات</h2>

        <div className="flex justify-center items-center gap-8 ml-9">
          <img
            src="/images/search-2.png"
            className="cursor-pointer w-[18px] h-[18px] object-contain"
          />

          <StickyNote className="cursor-pointer w-5 h-5 text-[#7A8699] rotate-90" />

          <img
            src="/images/clock.png"
            className="cursor-pointer w-[18px] h-[18px] object-contain"
          />

          <img
            src="/images/plus.png"
            className="cursor-pointer w-[18px] h-[18px] object-contain"
          />

          <div className="relative flex justify-center items-center cursor-pointer">
            <img
              src="/images/bell.png"
              className="w-[18px] h-[18px] object-contain"
            />

            <img
              src="/images/notification.png"
              className="w-4 absolute -top-2 -right-2"
            />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
