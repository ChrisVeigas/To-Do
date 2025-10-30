import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { logger } from "../utils/logger";
import { ZodArray } from "zod/v3";

const registerSchema = z.object({
  username: z.string().min(1, "Username is mandatory"),
  email: ZodArray
    .min(1, "Email is required")
    .email("Must be a valid email with @"),
  password: z
    .string()
    .min(6, "Password must be 6–8 characters")
    .max(8, "Password must be 6–8 characters")
    .regex(/[A-Z]/, "Must contain one uppercase letter")
    .regex(/[a-z]/, "Must contain one lowercase letter")
    .regex(/\d/, "Must contain one number")
    .regex(/[_!&]/, "Must contain one special character (_, !, or &)")
});

export function useRegisterForm() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Registration successful!", {
          description: "You can now log in to your account.",
          duration: 2500,
          position: "top-right",
        });

        logger.info("User registered successfully", {
          username: data.username,
          email: data.email,
        });

        navigate("/login");
      } else {
        toast.error("Registration failed", {
          description: result.message || "Please check your details and try again.",
          duration: 3000,
          position: "top-right",
        });

        logger.warn("Registration failed", {
          email: data.email,
          reason: result.message || "Unknown error",
        });
      }
    } catch (err) {
      toast.error("Something went wrong", {
        description: "Please try again later.",
        duration: 3000,
        position: "top-right",
      });

      logger.error("Error during registration", err);
    }
  };

  return { ...form, onSubmit };
}
