import { useCallback } from "react";
import { toast } from "sonner";
import { logger } from "../utils/logger";

export function useUserActions({ setUser, setToken }) {
  const login = useCallback(
    (userData, jwtToken) => {
      try {
        setUser(userData);
        setToken(jwtToken);

        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", jwtToken);

        toast.success(`Welcome back, ${userData.username || "User"}!`);
        logger.success("User logged in successfully", userData);
      } catch (error) {
        toast.error("Login failed. Please try again.");
        logger.error("Login error", error);
      }
    },
    [setUser, setToken]
  );

  const logout = useCallback(() => {
    try {
      setUser(null);
      setToken(null);

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      toast.info("You’ve been logged out.");
      logger.info("User logged out successfully");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      logger.error("Logout error", error);
    }
  }, [setUser, setToken]);

  const updateUser = useCallback(
    (newData) => {
      try {
        setUser((prevUser) => {
          const updatedUser = { ...prevUser, ...newData };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          toast.success("Profile updated successfully!");
          logger.success("User profile updated", updatedUser);
          return updatedUser;
        });
      } catch (error) {
        toast.error("Failed to update user profile.");
        logger.error("Profile update error", error);
      }
    },
    [setUser]
  );

  return { login, logout, updateUser };
}
