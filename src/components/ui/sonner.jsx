import { useTheme } from "next-themes"
import { Toaster as Sonner } from "sonner"
import { cn } from "../lib/utils"

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: cn(
            "group toast group-[.toaster]:border group-[.toaster]:shadow-lg transition-colors duration-200",
            "group-[.toaster]:bg-white group-[.toaster]:text-gray-900",
            "dark:group-[.toaster]:bg-neutral-900 dark:group-[.toaster]:text-gray-100 dark:group-[.toaster]:border-gray-700"
          ),
          description:
            "group-[.toast]:text-gray-600 dark:group-[.toast]:text-gray-400",
          actionButton: cn(
            "group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-1 transition-colors duration-150",
            "group-[.toast]:bg-blue-600 group-[.toast]:text-white hover:brightness-110",
            "dark:group-[.toast]:bg-blue-500 dark:group-[.toast]:text-white"
          ),
          cancelButton: cn(
            "group-[.toast]:rounded-md group-[.toast]:px-3 group-[.toast]:py-1 transition-colors duration-150",
            "group-[.toast]:bg-gray-100 group-[.toast]:text-gray-700 hover:bg-gray-200",
            "dark:group-[.toast]:bg-gray-800 dark:group-[.toast]:text-gray-300 dark:hover:bg-gray-700"
          ),
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
