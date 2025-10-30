// src/hooks/useEditAccount.js
import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { toast } from "sonner";
import { logger } from "../utils/logger";

export function useEditAccount() {
  const { user, updateUser } = useUser();
  const [username, setUsername] = useState(user?.username || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const validatePassword = useCallback((password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!username.trim()) {
        toast.error("Username cannot be empty!");
        return;
      }

      if (password && !validatePassword(password)) {
        toast.error(
          "Password must be at least 8 characters long, include one uppercase letter and one number."
        );
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/users/update/${user.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": localStorage.getItem("token"),
            },
            body: JSON.stringify({ username, password }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          toast.error(data.message || "Failed to update account.");
          logger.error("Account update failed:", data);
          return;
        }

        updateUser({ username });
        toast.success("Account updated successfully!");
        navigate("/");
      } catch (error) {
        logger.error("Error updating account:", error);
        toast.error("An error occurred while updating account.");
      } finally {
        setLoading(false);
      }
    },
    [username, password, user, validatePassword, updateUser, navigate]
  );

  return {
    username,
    password,
    setUsername,
    setPassword,
    handleSubmit,
    loading,
    inputRef,
  };
}
