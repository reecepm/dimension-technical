import Placeholder from "@tiptap/extension-placeholder";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Typography from "@tiptap/extension-typography";
import { type EditorOptions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Document from "@tiptap/extension-document";
import Emoji from "@tiptap-pro/extension-emoji";
import Link from "@tiptap/extension-link";

export const config: Partial<EditorOptions> = {
  extensions: [
    Document,
    StarterKit.configure({
      heading: {
        HTMLAttributes: {
          class: "text-xl font-medium",
        },
      },
      orderedList: {
        HTMLAttributes: {
          class: "list-decimal pl-7",
        },
      },
      bulletList: {
        HTMLAttributes: {
          class: "list-disc pl-7",
        },
      },
      listItem: {
        HTMLAttributes: {
          class: "",
        },
      },
    }),
    Emoji.configure(),
    Placeholder.configure({
      placeholder: "Describe this task",
      emptyNodeClass:
        "first:before:h-0 first:before:text-shade-300 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none first:before:text-sm",
    }),
    Link.configure({
      HTMLAttributes: {
        class: "text-blue-600",
      },
    }),
    TaskList,
    TaskItem.configure({
      HTMLAttributes: {
        tabIndex: "-1",
        class:
          "flex gap-2 [&>label>input]:h-4 [&>label>input]:w-4 [&>label>input]:rounded [&>label>input]:border-gray-300 [&>label>input]:text-blue-600 [&>*]:max-w-full outline-none ",
      },
    }),
    Typography,
  ],
  editorProps: {
    attributes: {
      class: "relative border-none text-sm outline-none min-w-0",
    },
  },
};
