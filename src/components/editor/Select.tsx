import CheckIcon from "@/icons/Check";
import SpinnerIcon from "@/icons/Spinner";
import * as Popover from "@radix-ui/react-popover";
import { Command } from "cmdk";
import React from "react";
import { twMerge } from "tailwind-merge";

export interface ValueType {
  value: string;
  label: string;
  color?: string;
  Icon?: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

interface Props {
  value: ValueType | ValueType[];
  onChange: (value: ValueType) => void;
  options: ValueType[];
  optionsLoading?: boolean;
  optionsError?: string;
  placeholder: string;
  Icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

const EditorSelect: React.FC<Props> = ({
  value,
  onChange,
  options,
  optionsLoading,
  optionsError,
  placeholder,
  Icon,
}) => {
  const [open, setOpen] = React.useState(false);

  const isMulti = Array.isArray(value);

  const ValueIcon = isMulti ? Icon : value?.Icon || Icon;

  return (
    <Popover.Root onOpenChange={setOpen} open={open} modal={false}>
      <Popover.Trigger asChild>
        <EditorTriggerButton
          className={
            value && !(isMulti && value.length === 0)
              ? "text-gray-900 hover:text-gray-900"
              : undefined
          }
        >
          {optionsLoading ? (
            <SpinnerIcon className="h-4 w-4 flex-shrink-0 animate-spin" />
          ) : isMulti && value.length > 0 && value.some((x) => x.color) ? (
            <div
              className={twMerge(
                "flex h-4 w-4 flex-shrink-0 items-center justify-center",
                value.length > 1 && "-space-x-1.5"
              )}
            >
              {value.slice(0, 3).map((item) => (
                <div
                  key={item.value}
                  className={twMerge(
                    "flex-shrink-0 rounded-full bg-current",
                    value.length > 1 ? "h-2 w-2" : "h-3 w-3",
                    item?.color
                  )}
                />
              ))}
            </div>
          ) : (
            <ValueIcon
              className={twMerge(
                "h-4 w-4 flex-shrink-0",
                Array.isArray(value)
                  ? value.length > 0
                    ? "text-gray-900 hover:text-gray-900"
                    : ""
                  : value?.color
              )}
            />
          )}
          {value && !(isMulti && value.length === 0)
            ? isMulti
              ? value.length > 1
                ? `${value.length} items`
                : value[0]?.label
              : value.label
            : placeholder}
          {/* todo: cleanup, ugly but it will do for now */}
        </EditorTriggerButton>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.preventDefault();
              e.stopPropagation();
              setOpen(false);
            }
          }}
          align="start"
          sideOffset={5}
          className={twMerge(
            "z-50 min-w-[8rem] overflow-hidden rounded-lg border border-black/10 bg-white p-1 text-gray-700 shadow-md	duration-100",
            "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1 data-[state=open]:slide-in-from-top-2",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-left-1 data-[state=closed]:slide-out-to-top-2"
          )}
        >
          <Command>
            <Command.Input
              placeholder="Search"
              className="mb-2 rounded border-none px-2 py-1 text-sm font-medium text-gray-900 outline-none ring-0 transition-all placeholder:text-shade-300"
            />
            <Command.List>
              {isMulti
                ? options.map((option) => {
                    const FinalIcon = option.Icon || Icon;

                    return (
                      <Command.Item
                        key={option.value}
                        value={option.label}
                        onSelect={(e) => onChange(option)}
                        className="relative flex cursor-default select-none items-center gap-2 rounded-md py-1.5 pl-2 pr-7 text-xs font-medium outline-none hover:bg-shade-100 focus:bg-shade-100 aria-selected:bg-shade-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                      >
                        <FinalIcon
                          className={twMerge(
                            "h-4 w-4 flex-shrink-0",
                            option.color
                          )}
                        />
                        {option.label}
                        {value.some((x) => x.value === option.value) && (
                          <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                            <CheckIcon className="h-4 w-4" />
                          </span>
                        )}
                      </Command.Item>
                    );
                  })
                : options.map((option) => {
                    const FinalIcon = option.Icon || Icon;

                    return (
                      <Command.Item
                        key={option.value}
                        value={option.label}
                        onSelect={(e) => onChange(option)}
                        className="relative flex cursor-default select-none items-center gap-2 rounded-md py-1.5 pl-2 pr-7 text-xs font-medium outline-none hover:bg-shade-100 focus:bg-shade-100 aria-selected:bg-shade-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                      >
                        <FinalIcon
                          className={twMerge(
                            "h-4 w-4 flex-shrink-0",
                            option.color
                          )}
                        />
                        {option.label}
                        {value?.value === option.value && (
                          <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                            <CheckIcon className="h-4 w-4" />
                          </span>
                        )}
                      </Command.Item>
                    );
                  })}
              {optionsError && (
                <Command.Empty className="py-1.5 px-2 text-xs text-red-500">
                  {optionsError}
                </Command.Empty>
              )}
              {optionsLoading && (
                <Command.Loading>
                  <SpinnerIcon className="h-4 w-4 animate-spin" />
                </Command.Loading>
              )}
              <Command.Empty className="py-1.5 px-2 text-xs text-shade-300">
                No results found.
              </Command.Empty>
            </Command.List>
          </Command>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default EditorSelect;

export const EditorTriggerButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    type="button"
    className={twMerge(
      "hover:text-shade-400c flex items-center gap-2 rounded-lg border border-shade-200 px-3 py-1.5 text-xs text-shade-300 transition-colors hover:bg-black/5 focus:border-shade-300 focus:outline-none focus:ring-0",
      className
    )}
    ref={ref}
    {...props}
  />
));

EditorTriggerButton.displayName = "EditorTriggerButton";
