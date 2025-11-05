import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

function Spinner({ className, ...props }) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn(
        "size-5 animate-spin text-gray-700 dark:text-gray-300",
        "transition-colors duration-200",
        className
      )}
      {...props}
    />
  );
}

export { Spinner };
