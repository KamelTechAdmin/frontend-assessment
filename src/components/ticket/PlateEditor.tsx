import { Plate, usePlateEditor } from "platejs/react";
import {
  BoldPlugin,
  ItalicPlugin,
  UnderlinePlugin,
} from "@platejs/basic-nodes/react";

import { Editor, EditorContainer } from "../../../@/components/ui/editor";
import { FixedToolbar } from "../../../@/components/ui/fixed-toolbar";
import { MarkToolbarButton } from "../../../@/components/ui/mark-toolbar-button";

import { Paperclip, Plus, Type } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { useEffect, useRef } from "react";

type PlateEditorProps = {
  showToolbar: boolean;
};

type PlateChangeEvent = {
  value: any;
  editor: any;
};

export default function PlateEditor({ showToolbar }: PlateEditorProps) {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const value = watch("reply");
  const previousValueRef = useRef(value);

  const handleChange = ({ value }: PlateChangeEvent) => {
    setValue("reply", value, { shouldDirty: true });
  };

  const editor = usePlateEditor({
    plugins: [BoldPlugin, ItalicPlugin, UnderlinePlugin],
  });

  useEffect(() => {
    if (JSON.stringify(previousValueRef.current) !== JSON.stringify(value)) {
      if (editor && editor.children && value) {
        editor.children = value;
        editor.onChange();
      }
      previousValueRef.current = value;
    }
  }, [value, editor]);

  return (
    <div className="w-full bg-white overflow-hidden border-t border-[#E3E8EF] my-6">
      <Plate editor={editor} value={value} onChange={handleChange}>
        {showToolbar && (
          <FixedToolbar className="flex items-center justify-end gap-3 border-b border-[#E3E8EF] bg-white  py-2">
            <button
              type="button"
              className="text-[#7A8699] hover:text-black transition"
            >
              <Paperclip size={18} />
            </button>
            <button
              type="button"
              className="text-[#7A8699] hover:text-black transition"
            >
              <Plus size={18} />
            </button>
            <button
              type="button"
              className="text-[#7A8699] hover:text-black transition"
            >
              <Type size={18} />
            </button>
            <div className="w-px h-5 bg-[#E3E8EF]" />
            <MarkToolbarButton nodeType="bold" tooltip="Bold">
              B
            </MarkToolbarButton>
            <MarkToolbarButton nodeType="italic" tooltip="Italic">
              I
            </MarkToolbarButton>
            <MarkToolbarButton nodeType="underline" tooltip="Underline">
              U
            </MarkToolbarButton>
          </FixedToolbar>
        )}

        <EditorContainer
          className="h-[43px] py-2 text-right  overflow-hidden scrollbar-hide"
          dir="rtl"
        >
          <Editor
            className="text-[14px] text-[#7A8699]"
            placeholder="إضافة رد ..."
          />
        </EditorContainer>
      </Plate>
      <p dir="rtl" className="text-red-500 text-xs mr-4">
        {errors.reply?.message}
      </p>
    </div>
  );
}
