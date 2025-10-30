import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export const useDeleteAccount = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const deleteAccount = async () => {
    // ✅ Support both "id" and "_id"
    const userId = user?._id || user?.id;
    console.log("🧾 Deleting user with ID:", userId, "User object:", user);

    if (!userId) {
      setError("No user found.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete your account?"
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/delete/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete account");

      // ✅ Clear stored user + token
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      navigate("/register");
    } catch (err) {
      console.error("❌ Delete Account Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { deleteAccount, loading, error };
};
