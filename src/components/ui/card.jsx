import * as React from "react";
import { cn } from "@/lib/utils";

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      `
      rounded-2xl border shadow-xl backdrop-blur-sm transition-all duration-300
      bg-white/95 text-[#3C5556] border-gray-200
      dark:bg-[#1E1E1E]/95 dark:text-gray-100 dark:border-[#2D2D40]
      hover:shadow-2xl hover:scale-[1.01]
      `,
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      `
      flex flex-col space-y-1.5 p-6 border-b border-transparent
      dark:border-b-[#2D2D40]
      `,
      className
    )}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      `
      font-semibold leading-none tracking-tight text-xl
      text-[#2D3748]
      dark:text-[#F1F5F9]
      `,
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      `
      text-sm text-[#64748B]
      dark:text-[#94A3B8]
      `,
      className
    )}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      `
      p-6 pt-0 text-[#334155]
      dark:text-[#CBD5E1]
      `,
      className
    )}
    {...props}
  />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      `
      flex items-center justify-end gap-3 p-6 pt-0 border-t border-transparent
      dark:border-t-[#2D2D40]
      `,
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
