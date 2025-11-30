import { ChevronUp, Expand, Paperclip } from "lucide-react";
import PlateEditor from "./PlateEditor";
import { useCallback, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { replySchema } from "@/validation/replyValidation";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  currentRequestTabAtom,
  type TicketMessageType,
} from "@/atoms/TicketAtoms";
import { v4 as uuidv4 } from "uuid";
import { addCC } from "@/utils/ccHelpers";
import { useTabs } from "@/hooks/useTabs";
import { useMessagesMutation } from "@/hooks/useMessagesMutation";
import { useAtom } from "jotai";

type Inputs = {
  reply: any;
  ccList: string[];
};

const buttonsText = [
  { id: 1, text: "أهلا، تم استلام طلبكم وجاري معالجته" },
  { id: 2, text: "مرحبا بك، سيتم تحويل المشكلة للفريق المختص" },
  { id: 3, text: "أهلا، تم استلام طلبكم وجاري معالجته" },
  { id: 4, text: "مرحبا بك، سيتم تحويل المشكلة للفريق المختص" },
];

const formatTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const ReplyBar = () => {
  const [setEditorKey] = useState(0);
  const [showToolbar, setShowToolbar] = useState(false);
  const [showCC, setShowCC] = useState(true);
  const [ccInput, setCcInput] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentTabId] = useAtom(currentRequestTabAtom);

  const { create } = useMessagesMutation();

  const { data: tabs } = useTabs();

  const methods = useForm<Inputs>({
    resolver: yupResolver(replySchema),
    defaultValues: {
      reply: [
        {
          id: "empty",
          type: "p",
          children: [{ text: "" }],
        },
      ],
      ccList: [],
    },
  });

  const { watch, setValue, getValues, formState } = methods;

  const handleAddCC = useCallback(
    (email: string) => {
      const current = getValues("ccList");
      const updated = addCC(email, current);
      setValue("ccList", updated, { shouldValidate: true });
      setCcInput("");
    },
    [getValues, setValue]
  );

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("Form data:", data);

    const message = data.reply[0]?.children[0]?.text || "";
    console.log("Message:", message);
    console.log("CC List:", data.ccList);

    const currentDate = new Date()
      .toLocaleDateString("en-GB")
      .replaceAll("/", "-");
    const currentTime = formatTime();

    const newObject: TicketMessageType = {
      id: uuidv4(),
      type: "staff",
      collapsed: false,
      name: "محمد صقر",
      name2: "راشد فهد",
      date: currentDate,
      time: currentTime,
      email1: "ahmed@example.com",
      email2: data.ccList,
      text: message,
      tabId: currentTabId,
    };

    create.mutate(newObject);

    methods.reset({
      reply: [
        {
          id: "empty",
          type: "p",
          children: [{ text: "" }],
        },
      ],
      ccList: [],
    });

    setEditorKey((k) => k + 1);
    setIsFullScreen(false);
    setCcInput("");
  };

  const handleRemoveCC = (index: number) => {
    const currentCCList = getValues("ccList");
    const updated = currentCCList.filter((_, i) => i !== index);
    setValue("ccList", updated, { shouldValidate: true });
  };

  const handleQuickTextClick = (text: string) => {
    setValue(
      "reply",
      [
        {
          id: "quick-text",
          type: "p",
          children: [{ text }],
        },
      ],
      { shouldValidate: true }
    );

    setEditorKey((k) => k + 1);
  };

  if (tabs?.length === 0) {
    return (
      <div className="w-[827px] h-[250px] border-t border-r border-[#E3E8EF] bg-white"></div>
    );
  }

  return (
    <div
      className={`flex flex-col gap-4 bg-white border-t border-r border-[#E3E8EF] pt-[21px] pr-6 pb-6 pl-6 w-[827px]
      ${isFullScreen ? "h-full w-full z-1000 bg-white fixed inset-0" : ""}
    `}
    >
      <div className="flex items-center w-full justify-between ">
        <div className="flex items-center gap-1 border border-[#B8BFCC] pt-2 pr-3 pb-2 pl-3 rounded-lg">
          <p className="text-[13px] font-normal text-[#7A8699] cursor-pointer">
            استدعاء من قالب
          </p>
          <img src="images/add.png" className="w-[9.6px] h-3" />
        </div>

        <div className="custom-scroll flex gap-2 h-[45px] flex-1 mx-4 items-center bg-[#F7F8FA] overflow-x-auto overflow-y-hidden whitespace-nowrap rounded-[10px] px-2 [direction:rtl]">
          <div className="flex gap-2 [direction:ltr]">
            {buttonsText.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleQuickTextClick(item.text)}
                className="cursor-pointer px-3 py-1 bg-white text-[#7A8699] text-[9px] border border-[#B8BFCC] rounded-[20px] hover:bg-gray-50 transition-colors"
              >
                {item.text}
              </button>
            ))}
          </div>
        </div>

        <p className="text-[13px] font-normal text-[#7A8699] w-[65px] text-right mr-3.5">
          ردود سريعة
        </p>
      </div>

      <div className="border border-[#E2E8F0] flex flex-col gap-2 py-4 mr-4 rounded-lg">
        <div className="flex items-center justify-end gap-2 mr-3.5">
          <div className="mr-auto">
            <div className="flex justify-center items-center gap-2 ml-3">
              <div
                onClick={() => setIsFullScreen((full) => !full)}
                className="w-8 h-8 border border-[#7A8699] flex justify-center items-center rounded-lg p-2 cursor-pointer"
              >
                <Expand className="text-[#7A8699]" />
              </div>
              <div
                onClick={() => setShowCC((show) => !show)}
                className="bg-[#5BC783] w-8 h-8 text-[13px] flex items-center justify-center font-normal text-white rounded-lg cursor-pointer"
              >
                cc
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 ">
              <span
                className="px-2 py-1 bg-white text-[11px] 
          border-[0.5px] border-[#B8BFCC]
          rounded-[20px]
          pt-1 pr-3 pb-1 pl-3
          text-[#7A8699]"
              >
                ahmed@example.com
              </span>
            </div>
            <p dir="rtl" className="text-[#7A8699] text-[12px]">
              رد إلى :
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 mr-3.5">
          <div className="flex items-center gap-2 flex-wrap">
            {watch("ccList").map((email, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1 px-2 py-1 bg-white border border-[#B8BFCC] rounded-full text-[10px]"
              >
                <button
                  type="button"
                  onClick={() => handleRemoveCC(idx)}
                  className="text-[#7A8699] text-[12px] hover:text-red-700 mr-1 ml-1 cursor-pointer"
                >
                  X
                </button>
                <span>{email}</span>
              </div>
            ))}

            {showCC && (
              <div className="relative w-[216px] flex-1 mr-4">
                <img
                  src="images/search.png"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-3 opacity-60"
                  alt="search"
                />
                <input
                  type="text"
                  value={ccInput}
                  onChange={(e) => setCcInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddCC(ccInput);
                    }
                  }}
                  dir="rtl"
                  placeholder="ادخل الاسم"
                  className="
                    w-full
                    text-[9.57px]
                    pr-9
                    pl-3
                    py-2
                    bg-[#F7F8FA]
                    border border-[#E2E8F0]
                    rounded-lg
                    focus:outline-none
                    focus:border-[#00CA7C]
                    focus:ring-1
                    focus:ring-[#00CA7C]
                    placeholder:text-[#A0AEC0]
                  "
                />
                {formState.errors.ccList && (
                  <p className="text-red-500 text-[10px] absolute right-0 -bottom-4.5">
                    {formState.errors.ccList.message}
                  </p>
                )}
              </div>
            )}
          </div>
          <p className="text-[#7A8699] text-[12px]">: cc</p>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div>
              <PlateEditor
                showToolbar={showToolbar}
                initialContent={methods.watch("reply")}
              />
            </div>

            <div className="flex justify-between items-center [direction:rtl]">
              <div className="flex items-center gap-3 mr-4">
                <div
                  onClick={() => setShowToolbar((show) => !show)}
                  className="cursor-pointer"
                >
                  <img className="w-3" src="/images/A.png" />
                </div>
                <div className="cursor-pointer">
                  <img className="w-3.5" src="/images/star.png" />
                </div>
                <Paperclip className="text-[#7A8699] cursor-pointer w-3.5" />
              </div>

              <div className="flex items-center gap-3 ml-3">
                <button
                  type="button"
                  onClick={() => {
                    methods.reset({
                      reply: [
                        {
                          id: "empty",
                          type: "p",
                          children: [{ text: "" }],
                        },
                      ],
                      ccList: [],
                    });
                    setEditorKey((k) => k + 1);
                    setCcInput("");
                  }}
                  className="cursor-pointer px-3 py-2 border border-[#B8BFCC] rounded-lg text-[#7A8699] flex gap-2 items-center"
                >
                  <span>x</span>
                  إلغاء
                </button>
                <button
                  type="submit"
                  className="cursor-pointer px-3 py-2 bg-[#00CA7C] text-white rounded-lg hover:bg-[#00b16d] flex items-center gap-2"
                >
                  <p className="text-[13px] font-normal">إضافة رد</p>
                  <div className="w-px h-5 bg-white/20"></div>
                  <ChevronUp />
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ReplyBar;
