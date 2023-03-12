import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  shortcut?: {
    label: React.ReactNode;
    key: string;
  };
}

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, shortcut, className, variant, ...props }, ref) => {
  const [pressed, setPressed] = React.useState(false); // artificial pressed state for keyboard shortcuts

  return (
    <button
      className={twMerge(buttonVariants({ variant, pressed }), className)}
      ref={ref}
      onKeyDown={(e) => {
        if (
          shortcut &&
          e.key === shortcut.key &&
          !e.defaultPrevented &&
          !pressed
        ) {
          setPressed(true);
        }
      }}
      onKeyUp={(e) => {
        if (shortcut && e.key === shortcut.key && !e.defaultPrevented) {
          setPressed(false);
          e.currentTarget.click();
        }
      }}
      {...props}
    >
      <span>{children}</span>
      {shortcut && (
        <>
          <span className="separator w-px bg-white/20" />
          <span className="flex items-center justify-center">
            {shortcut.label}
          </span>
        </>
      )}
      {/* todo: might be a better way to redo this without the weird css selector */}
    </button>
  );
});

Button.displayName = "Button";

export { Button };

const buttonVariants = cva(
  "relative rounded-lg outline-none shadow-button font-medium text-sm flex items-stretch [&>:not(.separator)]:px-3 [&>:not(.separator)]:pt-1.5 [&>:not(.separator)]:pb-[7px] disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-button-default text-white",
      },
      pressed: {
        true: "enabled:shadow-none enabled:top-[3px]",
        false: "enabled:active:shadow-none enabled:active:top-[3px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);
