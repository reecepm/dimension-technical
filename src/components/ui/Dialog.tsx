import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { twMerge } from "tailwind-merge";
import ChevronRightIcon from "@/icons/ChevronRight";

const Dialog = (props: DialogPrimitive.DialogProps) => {
  return <DialogPrimitive.Root {...props} />;
};

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Content
      ref={ref}
      className={twMerge(
        "fixed top-[50%] left-[50%] z-50 grid w-full max-w-[718px] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-[10px] bg-white p-4 shadow-dialog will-change-transform",
        "data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-bottom-[-48%] data-[state=open]:slide-in-from-left-[50%]",
        "data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 data-[state=closed]:slide-out-to-bottom-[-48%] data-[state=closed]:slide-out-to-left-[50%]",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  tag: React.ReactNode;
  action: React.ReactNode;
}

const DialogHeader = ({ className, tag, action, ...props }: HeaderProps) => (
  <div
    className={twMerge(
      "flex items-center gap-0.5 text-center text-sm font-medium text-shade-400",
      className
    )}
    {...props}
  >
    {tag}
    <ChevronRightIcon className="h-5 w-5" />
    {action}
  </div>
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <>
    <hr className="w-[calc(100% + 32px)] -mx-4 mt-0.5 h-px border-none bg-lightBorder" />
    <div
      className={twMerge(
        "flex items-center justify-between only:[&>*]:ml-auto",
        className
      )}
      {...props}
    />
  </>
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={twMerge("text-lg font-semibold text-slate-900", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge("flex min-w-0 flex-col gap-4 px-2 pt-2", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

Dialog.Trigger = DialogPrimitive.Trigger;
Dialog.Portal = DialogPrimitive.Portal;
Dialog.Content = DialogContent;
Dialog.Header = DialogHeader;
Dialog.Footer = DialogFooter;
Dialog.Title = DialogTitle;
Dialog.Description = DialogDescription;

export { Dialog };
