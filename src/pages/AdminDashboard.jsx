import { useState } from "react";
import { useAdminData } from "../hooks/useAdminData";
import { Button } from "../components/ui/button";
import { Tooltip } from "../components/ui/Tooltip";
import Loader from "../components/Loader";
import { Card, CardContent } from "../components/ui/card";
import { Separator } from "../components/ui/separator";
import UserTasksModal from "../components/admin/UserTasksModal";
import EditUserModal from "../components/admin/EditUserModal";

export default function AdminDashboard() {
  const { users, activeCount, loading, deleteUser, getUserTasks, updateUser } = useAdminData();
  const [selectedUser, setSelectedUser] = useState(null);
  const [userTasks, setUserTasks] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState(false);
  const [openTasks, setOpenTasks] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleViewTasks = async (user) => {
    setSelectedUser(user);
    setOpenTasks(true);
    setLoadingTasks(true);
    try {
      const tasks = await getUserTasks(user._id);
      setUserTasks(tasks);
    } catch (err) {
      console.error("Error fetching user tasks:", err);
    } finally {
      setLoadingTasks(false);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setOpenEdit(true);
  };

  if (loading) return <Loader text="Fetching admin data..." />;

  return (
    <div className="pt-20 w-[1000px] h-[500px] bg-background text-foreground transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6 tracking-tight">Admin Dashboard</h1>

      <div className="grid sm:grid-cols-2 gap-6 mb-10">
        <Card>
          <CardContent className="p-5">
            <p className="text-lg font-semibold">👥 Total Users</p>
            <p className="text-3xl font-bold mt-2">{users.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-lg font-semibold">🟢 Active Users</p>
            <p className="text-3xl font-bold mt-2">{activeCount}</p>
          </CardContent>
        </Card>
      </div>

      <Separator className="mb-8" />

      <div className="overflow-x-auto rounded-lg border border-border bg-card shadow-sm">
        <table className="w-full min-w-[600px] text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground uppercase tracking-wider">
            <tr>
              <th className="p-3">Username</th>
              <th className="p-3">Email</th>
              <th className="p-3">Role</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-b border-border hover:bg-muted/30 transition-colors"
              >
                <td className="p-3 font-medium">{user.username}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 capitalize">{user.role}</td>
                <td className="p-3 text-center">
                  <div className="flex justify-center gap-2">
                    <Tooltip label="View User Tasks">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewTasks(user)}
                      >
                        📋
                      </Button>
                    </Tooltip>

                    <Tooltip label="Edit User">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleEditUser(user)}
                      >
                        ✏️
                      </Button>
                    </Tooltip>

                    <Tooltip label="Delete User">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => deleteUser(user._id)}
                      >
                        🗑️
                      </Button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <UserTasksModal
        open={openTasks}
        onClose={() => setOpenTasks(false)}
        user={selectedUser}
        tasks={userTasks}
        loading={loadingTasks}
      />

      <EditUserModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        user={selectedUser}
        onSave={updateUser}
      />
    </div>
  );
}
