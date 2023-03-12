import {
  AtIcon,
  AttachmentIcon,
  BoldIcon,
  ChecklistIcon,
  CodeIcon,
  HeadingIcon,
  ItalicIcon,
  OrderedListIcon,
  UnorderedListIcon,
} from "@/icons/editor";
import { type Editor } from "@tiptap/core";
import React from "react";
import { twMerge } from "tailwind-merge";
import EmojiPopover from "./EmojiPopover";
import LinkPopover from "./LinkPopover";

interface Props {
  editor: Editor;
}

const EditorMenu: React.FC<Props> = ({ editor }) => {
  return (
    <div className="mx-1 mt-[3px] mb-1 flex w-full items-center gap-1 text-shade-400">
      <IconButton>
        <AttachmentIcon />
      </IconButton>
      <IconButton>
        <AtIcon />
      </IconButton>
      <EmojiPopover editor={editor} />
      <IconButton
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({
              level: 3,
            })
            .run()
        }
        disabled={
          !editor
            .can()
            .chain()
            .focus()
            .toggleHeading({
              level: 3,
            })
            .run()
        }
        className={editor.isActive("heading", { level: 3 }) ? "text-black" : ""}
      >
        <HeadingIcon />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "text-black" : ""}
      >
        <BoldIcon />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "text-black" : ""}
      >
        <ItalicIcon />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        className={editor.isActive("code") ? "text-black" : ""}
      >
        <CodeIcon />
      </IconButton>
      <LinkPopover editor={editor} />
      <IconButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        className={editor.isActive("orderedList") ? "text-black" : ""}
      >
        <OrderedListIcon />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        className={editor.isActive("bulletList") ? "text-black" : ""}
      >
        <UnorderedListIcon />
      </IconButton>
      <IconButton
        onClick={() => editor.chain().focus().toggleTaskList().run()}
        disabled={!editor.can().chain().focus().toggleTaskList().run()}
        className={editor.isActive("taskList") ? "text-black" : ""}
      >
        <ChecklistIcon />
      </IconButton>
    </div>
  );
};

export default EditorMenu;

export const IconButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    type="button"
    className={twMerge(
      "rounded p-1 transition-colors focus:outline-none focus:ring-1 focus:ring-shade-300  enabled:hover:bg-black/5 disabled:opacity-50",
      className
    )}
    ref={ref}
    {...props}
  />
));

IconButton.displayName = "IconButton";
