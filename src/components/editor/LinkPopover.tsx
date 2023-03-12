import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { LinkIcon, TrashIcon } from "@/icons/editor";
import { IconButton } from "./EditorMenu";
import { type Editor } from "@tiptap/core";
import { twMerge } from "tailwind-merge";

interface Props {
  editor: Editor;
}

const LinkPopover: React.FC<Props> = ({ editor }) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <IconButton
          disabled={
            !editor
              .can()
              .chain()
              .focus()
              .toggleLink({ href: "https://example.com" })
              .run()
          }
          className={editor.isActive("link") || open ? "text-black" : ""}
        >
          <LinkIcon />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content
        className={twMerge(
          "z-50 w-72 rounded-md border border-lightBorder bg-white shadow-sm",
          "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-[0.97]",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-[0.97]"
        )}
        sideOffset={5}
        side="top"
      >
        <fieldset className="flex gap-2">
          <input
            placeholder="Enter URL link"
            className="w-full rounded-md border-none px-3 py-1.5 text-sm font-medium text-black outline-none placeholder:text-shade-300"
            id="link"
            autoFocus
            onKeyDown={(e) => {
              if (open && e.key === "Enter") {
                if (e.currentTarget.value === "")
                  editor
                    .chain()
                    .focus()
                    .extendMarkRange("link")
                    .unsetLink()
                    .run();
                else
                  editor
                    .chain()
                    .focus()
                    .extendMarkRange("link")
                    .setLink({ href: e.currentTarget.value })
                    .run();
              }
            }}
          />
          <button
            className="text-s m-1 rounded px-1 font-medium text-shade-400 outline-none hover:bg-black/5"
            onClick={() => {
              if (open) {
                editor
                  .chain()
                  .focus()
                  .extendMarkRange("link")
                  .unsetLink()
                  .run();
              }
            }}
          >
            <TrashIcon className="h-[18px] w-[18px]" />
          </button>
        </fieldset>
      </Popover.Content>
    </Popover.Root>
  );
};

export default LinkPopover;
