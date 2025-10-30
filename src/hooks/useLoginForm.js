import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { toast } from "sonner";
import { logger } from "../utils/logger";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password must not exceed 20 characters"),
});

export function useLoginForm() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setErrorMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/login", data);
      login(res.data.user, res.data.token);

      toast.success("Login successful!", {
        description: `Welcome back, ${res.data.user.username || "User"}!`,
        duration: 2500,
        position: "top-right",
      });

      logger.info("User logged in successfully", { email: data.email });

      navigate("/");
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Invalid email or password. Please try again.";

      setErrorMessage(message);

      toast.error("Login failed", {
        description: message,
        duration: 3000,
        position: "top-right",
      });

      logger.error("Login attempt failed", { email: data.email, error: err });
    }
  };

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    errorMessage,
  };
}
