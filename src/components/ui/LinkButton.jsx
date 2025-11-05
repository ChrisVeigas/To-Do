import { Link } from "react-router-dom";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

export function LinkButton({ to, className, ...props }) {
  return (
    <Button
      as={Link}
      to={to}
      className={cn(
        // theme-aware base
        "transition-colors duration-200",
        "text-primary hover:text-primary/80",
        "dark:text-primary-foreground dark:hover:text-primary-foreground/80",
        className
      )}
      {...props}
    />
  );
}
