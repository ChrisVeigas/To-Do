import { Link } from "react-router-dom";
import { Button } from "./Button";

export function LinkButton({ to, ...props }) {
  return <Button as={Link} to={to} {...props} />;
}
