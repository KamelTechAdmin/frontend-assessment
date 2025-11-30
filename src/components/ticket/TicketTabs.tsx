import { currentRequestTabAtom, requestTabsAtom } from "@/atoms/TicketAtoms";
import { useAtom } from "jotai";
import { useState } from "react";

import { Button } from "../../../@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../@/components/ui/dialog";
import { Input } from "../../../@/components/ui/input";
import { Label } from "../../../@/components/ui/label";

import { motion } from "framer-motion";
import { useTabs } from "@/hooks/useTabs";
import { TabType } from "./TicketHeader";
import { useTabsMutations } from "@/hooks/useTabsMutation";

export const shorten = (str: string, max: number) => {
  return str.length > max ? str.slice(0, max) + "..." : str;
};

const TicketTabs = () => {
  const { data: tabs } = useTabs();

  const [active, setActive] = useState("1");

  const [currentTab, setCurrentTab] = useAtom(currentRequestTabAtom);

  const [title, setTitle] = useState("");
  const [, setAllMessages] = useAtom(requestTabsAtom);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [shake, setShake] = useState(false);

  const shakeVariants = {
    shake: {
      x: [-8, 8, -6, 6, -4, 4, 0],
      transition: { duration: 0.4 },
    },
  };

  const { create, remove } = useTabsMutations();

  const removeTab = (id: string) => {
    const index = tabs.findIndex((tab: TabType) => tab.id === id);

    remove.mutate(id, {
      onSuccess: () => {
        const newTabs = tabs.filter((tab: TabType) => tab.id !== id);

        if (newTabs.length === 0) {
          setCurrentTab("0");
          setActive("0");
          return [];
        }

        if (currentTab === id) {
          const nextIndex = index < newTabs.length ? index : newTabs.length - 1;

          const nextId = newTabs[nextIndex].id;
          setCurrentTab(nextId);
          setActive(nextId);
        }
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log("hello");
    e.preventDefault();

    if (!title.trim()) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
      return;
    }

    const newId = String(Date.now());

    create.mutate({
      id: newId,
      title: title.trim(),
      number: Math.floor(Math.random() * 9000) + 1000,
    });

    setAllMessages((prev) => [
      ...prev,
      {
        tabId: newId,
        messageList: [],
        isImportant: false,
      },
    ]);

    setActive(newId);
    setCurrentTab(newId);
    setTitle("");
    setIsDialogOpen(false);
  };

  return (
    <div
      dir="rtl"
      className="flex items-center w-full border-b border-r border-[#E3E8EF] bg-white  overflow-x-auto gap-3"
    >
      <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap ">
        {tabs?.map((tab: TabType) => (
          <div
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`
              group flex items-center gap-3 px-3 py-2   cursor-pointer transition
              border-l border-[#E2E8F0]
              ${
                active == tab.id
                  ? "border-b-0"
                  : "hover:bg-gray-50 text-[#98A2B2]"
              }
            `}
          >
            <div
              onClick={() => setCurrentTab(tab.id)}
              className="flex flex-col text-right"
            >
              <p
                className={`text-[11px] font-medium  
                ${active == tab.id ? "text-[#373E5D]" : "text-[#98A2B2]"}
                `}
              >
                {shorten(tab.title, 28)}
              </p>
              <p className="text-[7px] text-[#7A8699]">
                رقم الطلب: {tab.number}
              </p>
            </div>

            <span
              onClick={(e) => {
                e.stopPropagation();
                removeTab(tab.id);
              }}
              className="text-[#7A8699] hover:text-red-500 cursor-pointer"
            >
              ✕
            </span>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <div className="pl-2">
            <button className="min-w-8 h-8 flex items-center justify-center border border-[#E3E8EF] rounded-lg text-[#373E5D] hover:bg-gray-50 cursor-pointer">
              +
            </button>
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] bg-white" dir="rtl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            <DialogHeader>
              <DialogTitle>إنشاء طلب جديد</DialogTitle>
              <DialogDescription>
                ادخل عنوان الطلب ثم اضغط إنشاء.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-3 mb-4">
                  <Label htmlFor="name-1">العنوان</Label>
                  <motion.div
                    animate={shake ? "shake" : ""}
                    variants={shakeVariants}
                  >
                    <Input
                      id="new-title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="ادخل عنوان الطلب"
                    />
                  </motion.div>
                </div>
              </div>

              <DialogFooter>
                <Button
                  onClick={() => setIsDialogOpen(false)}
                  variant="outline"
                  className="cursor-pointer"
                >
                  إلغاء
                </Button>
                <Button className="cursor-pointer" type="submit">
                  إنشاء
                </Button>
              </DialogFooter>
            </form>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
export default TicketTabs;
