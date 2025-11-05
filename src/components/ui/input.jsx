import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        // base
        "flex h-9 w-full rounded-md border px-3 py-1 text-base shadow-sm transition-colors",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
        "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",

        // light mode
        "bg-white text-gray-900 border-gray-300 placeholder:text-gray-400 focus-visible:ring-gray-400",

        // dark mode
        "dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:placeholder:text-gray-500 dark:focus-visible:ring-gray-600",

        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
