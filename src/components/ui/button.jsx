/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: `
          bg-[#E9F1EF] text-[#3C5556] shadow hover:bg-[#d6e5e2]
          dark:bg-[#475569] dark:text-[#f1f5f9] dark:hover:bg-[#64748b]
        `,
        destructive: `
          bg-red-500 text-white hover:bg-red-600
          dark:bg-red-600 dark:hover:bg-red-700
        `,
        outline: `
          border border-[#cbd5e1] bg-transparent text-[#334155] hover:bg-[#e2e8f0]
          dark:border-[#475569] dark:text-[#f1f5f9] dark:hover:bg-[#1e293b]
        `,
        secondary: `
          bg-[#EAF4F4] text-[#011956] hover:bg-[#DDECF2]
          dark:bg-[#1e293b] dark:text-[#e2e8f0] dark:hover:bg-[#334155]
        `,
        ghost: `
          hover:bg-[#E9F1EF] hover:text-[#3C5556]
          dark:hover:bg-[#475569] dark:hover:text-[#f1f5f9]
        `,
        link: `
          text-[#011956] underline-offset-4 hover:underline
          dark:text-[#e2e8f0]
        `,
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const MotionButton = motion.create(
  React.forwardRef(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
      const Comp = asChild ? Slot : "button";
      return (
        <Comp
          ref={ref}
          className={cn(buttonVariants({ variant, size, className }))}
          {...props}
        />
      );
    }
  )
);

MotionButton.displayName = "MotionButton";

export const Button = React.forwardRef((props, ref) => (
  <MotionButton ref={ref} whileTap={{ scale: 0.97 }} {...props} />
));

Button.displayName = "Button";

export { buttonVariants };
