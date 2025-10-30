import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { useUser } from "../context/UserContext";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { Button } from "../components/ui/button";
import { Card, CardHeader, CardContent } from "../components/ui/card";
import { Trash2, ArrowLeft } from "lucide-react";

function DeleteTask() {
  const { tasks } = useTasks();
  const { user } = useUser();
  const { deleteTask, loading } = useDeleteTask();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-[#1E2D2F] to-[#3C5556] px-4 py-10">
      <motion.h2
        className="text-3xl font-bold text-[#E9F1EF] mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {user ? `${user.username}'s Tasks` : "Delete Tasks"}
      </motion.h2>

      <div className="w-full max-w-2xl">
        {tasks.length === 0 ? (
          <motion.p
            className="text-center text-gray-300 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            No tasks to delete.
          </motion.p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task, index) => (
              <Card
                key={task._id}
                component={motion.div}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#E9F1EF] shadow-md rounded-2xl overflow-hidden border border-[#D1E0DC] hover:shadow-lg transition-all duration-300"
              >
                <CardHeader className="flex justify-between items-center py-3 bg-[#D1E0DC] px-5">
                  <h3 className="text-lg font-semibold text-[#2C4445]">
                    {task.title}
                  </h3>
                </CardHeader>
                <CardContent className="p-5 bg-[#E9F1EF]">
                  <p className="text-[#3C5556] text-sm whitespace-pre-wrap mb-4">
                    {task.description}
                  </p>
                  <Button
                    component={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteTask(task._id)}
                    disabled={loading}
                    className="flex items-center gap-2 bg-[#70056B] hover:bg-[#590457] text-white"
                  >
                    <Trash2 size={16} />
                    {loading ? "Deleting..." : "Delete"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <motion.div
        className="flex justify-center mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Button
          component={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          variant="outline"
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[#E9F1EF] border-[#E9F1EF] hover:bg-[#2C4445]"
        >
          <ArrowLeft size={18} />
          Back to To-Do
        </Button>
      </motion.div>
    </div>
  );
}

export default DeleteTask;
