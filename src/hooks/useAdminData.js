import { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "sonner";

export const useAdminData = () => {
  const [users, setUsers] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = "http://localhost:5000/api/admin";
  const token = useMemo(() => localStorage.getItem("token"), []);

  const config = useMemo(
    () => ({
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    }),
    [token]
  );

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [usersRes, activeRes] = await Promise.all([
        axios.get(`${BASE_URL}/users`, config),
        axios.get(`${BASE_URL}/active-users`, config),
      ]);

      setUsers(usersRes.data?.users || []);
      setActiveCount(activeRes.data?.activeUsers || 0);

      console.log(
        "%c✅ Admin data fetched successfully",
        "color: #22c55e; font-weight: bold;"
      );
    } catch (err) {
      console.error("❌ Error fetching admin data:", err);
      setError(err);
      handleError(err, "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  }, [config]);

  const deleteUser = useCallback(
    async (id) => {
      if (!window.confirm("Are you sure you want to delete this user?")) return;
      try {
        await axios.delete(`${BASE_URL}/users/${id}`, config);
        setUsers((prev) => prev.filter((u) => u._id !== id));
        toast.success("User deleted successfully.");
      } catch (err) {
        console.error("❌ Delete failed:", err);
        handleError(err, "Failed to delete user.");
      }
    },
    [config]
  );

  const updateUser = useCallback(
    async (id, updatedData) => {
      try {
        const res = await axios.put(
          `${BASE_URL}/users/${id}`,
          updatedData,
          config
        );
        setUsers((prev) => prev.map((u) => (u._id === id ? res.data.user : u)));
        toast.success("User updated successfully.");
      } catch (err) {
        console.error("❌ Update failed:", err);
        handleError(err, "Failed to update user.");
      }
    },
    [config]
  );

  const getUserTasks = useCallback(
    async (userId) => {
      try {
        const res = await axios.get(
          `${BASE_URL}/users/${userId}/tasks`,
          config
        );
        return res.data.tasks || [];
      } catch (err) {
        console.error("❌ Failed to fetch user tasks:", err);
        handleError(err, "Failed to load user's tasks.");
        return [];
      }
    },
    [config]
  );

  const handleError = (err, fallbackMessage) => {
    if (err.response?.status === 401) {
      toast.error("Unauthorized. Please log in again.");
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else if (err.response?.status === 404) {
      toast.error("Endpoint not found.");
    } else {
      toast.error(fallbackMessage);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    activeCount,
    loading,
    error,
    deleteUser,
    updateUser,
    getUserTasks,
    refresh: fetchUsers,
  };
};
