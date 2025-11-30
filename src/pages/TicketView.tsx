import Timeline from "../components/layout/Timeline";
import Sidebar from "../components/layout/Sidebar";
import TicketContentArea from "../components/layout/TicketContentArea";
import FixedSidebar from "@/components/layout/FixedSidebar";
import Navbar from "@/components/layout/Navbar";
import TicketTabs from "@/components/ticket/TicketTabs";

const TicketView = () => {
  return (
    <div className="flex min-h-screen font-rubik w-[1440px] mx-auto">
      <div className="flex flex-col items-end  w-full ">
        <div className="w-[1143px] border-l border-[#E2E8F0]">
          <Navbar />
          <TicketTabs />
        </div>
        <div className="flex">
          <Sidebar />
          <Timeline />
          <TicketContentArea />
        </div>
      </div>
      <div className="w-[260px]">
        <FixedSidebar />
      </div>
    </div>
  );
};

export default TicketView;
