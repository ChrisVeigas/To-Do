import { useState } from "react";
import { cn } from "@/lib/utils";

export function Tooltip({ label, children }) {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          className={cn(
            "absolute bottom-full mb-2 px-2 py-1 text-xs rounded-md whitespace-nowrap shadow transition-colors duration-200",
            "bg-gray-800 text-white",
            "dark:bg-gray-200 dark:text-gray-900"
          )}
        >
          {label}
        </div>
      )}
    </div>
  );
}
