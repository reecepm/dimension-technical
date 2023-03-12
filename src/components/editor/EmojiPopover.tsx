import React, { useMemo, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { EmojiIcon } from "@/icons/editor";
import { IconButton } from "./EditorMenu";
import { type Editor } from "@tiptap/core";
import { twMerge } from "tailwind-merge";
import { emojis } from "@tiptap-pro/extension-emoji";
import { useVirtualizer } from "@tanstack/react-virtual";

interface Props {
  editor: Editor;
}

const EmojiPopover: React.FC<Props> = ({ editor }) => {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");

  const filteredEmojis = useMemo(() => {
    let filtered = emojis.filter((emoji) => {
      if (search === "") return true;
      return emoji.shortcodes.some((shortcode) =>
        shortcode.toLowerCase().includes(search.toLowerCase())
      );
    });
    const chunked = [];
    for (let i = 0; i < filtered.length; i += 9) {
      chunked.push(filtered.slice(i, i + 9));
    }
    return chunked;
  }, [search, emojis]);

  const parentRef = React.useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: filteredEmojis.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 28,
  });

  return (
    <Popover.Root onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <IconButton
          disabled={!editor.can().chain().focus().setEmoji("joy").run()}
          className={editor.isActive("emoji") || open ? "text-black" : ""}
        >
          <EmojiIcon />
        </IconButton>
      </Popover.Trigger>
      <Popover.Content
        ref={parentRef}
        className={twMerge(
          "z-50 flex max-h-40 w-80 flex-col justify-center rounded-md border border-lightBorder bg-white py-2 px-1 shadow-sm",
          "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-[0.97]",
          "data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-[0.97]"
        )}
        sideOffset={5}
        side="bottom"
      >
        <input
          type="text"
          placeholder="Search"
          className="mb-1 rounded border-none px-2 py-1 text-sm font-medium text-gray-900 placeholder:text-shade-300"
          autoFocus
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div className="h-full w-full overflow-auto">
          <div
            style={{
              height: `${rowVirtualizer.getTotalSize()}px`,
              width: "100%",
              position: "relative",
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualItem) => (
              <div
                key={virtualItem.key}
                className="let-0 absolute top-0 flex w-full items-center gap-1.5"
                style={{
                  height: `${virtualItem.size}px`,
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                {filteredEmojis[virtualItem.index]!.map((emoji) => {
                  const set =
                    emoji.shortcodes.length > 0
                      ? emoji.shortcodes[0]
                      : emoji.name;
                  return (
                    <button
                      key={emoji.name}
                      type="button"
                      className="h-7 w-7 rounded px-1 font-medium text-shade-400 outline-none hover:bg-black/5"
                      onClick={() => {
                        if (open) {
                          editor
                            .chain()
                            .setEmoji(set || emoji.name)
                            .run();
                        }
                      }}
                    >
                      {emoji.fallbackImage ? (
                        <img src={emoji.fallbackImage} />
                      ) : (
                        emoji.emoji
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </Popover.Content>
    </Popover.Root>
  );
};

export default EmojiPopover;
