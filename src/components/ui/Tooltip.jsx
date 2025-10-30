import { useState } from "react";

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
        <div className="absolute bottom-full mb-2 px-2 py-1 text-xs text-white bg-gray-700 rounded-md whitespace-nowrap shadow">
          {label}
        </div>
      )}
    </div>
  );
}
