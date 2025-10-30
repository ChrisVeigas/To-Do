// src/hooks/useCustomScrollbar.js
import { useEffect } from "react";
import { useThemeContext } from "../context/ThemeContext";

export function useCustomScrollbar() {
  const { theme } = useThemeContext();

  useEffect(() => {
    const style = document.createElement("style");
    style.id = "custom-scrollbar-style";

    const scrollbarColor =
      theme === "light"
        ? {
            thumb: "#3C5556", 
            track: "#E9F1EF", 
          }
        : {
            thumb: "#555", 
            track: "#1A1A1A", 
          };

    style.innerHTML = `
      /* For Webkit Browsers */
      ::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }

      ::-webkit-scrollbar-track {
        background: ${scrollbarColor.track};
        border-radius: 10px;
      }

      ::-webkit-scrollbar-thumb {
        background: ${scrollbarColor.thumb};
        border-radius: 10px;
        transition: background 0.3s ease;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: ${theme === "light" ? "#2C4445" : "#777"};
      }

      /* Firefox */
      * {
        scrollbar-width: thin;
        scrollbar-color: ${scrollbarColor.thumb} ${scrollbarColor.track};
      }
    `;

    const oldStyle = document.getElementById("custom-scrollbar-style");
    if (oldStyle) oldStyle.remove();

    document.head.appendChild(style);

    return () => {
      const currentStyle = document.getElementById("custom-scrollbar-style");
      if (currentStyle) currentStyle.remove();
    };
  }, [theme]);
}
