import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { useThemeContext } from "../context/ThemeContext";
import { useTasks } from "../context/TaskContext";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DeleteTask() {
  const { loading, error, deleteAllTasks } = useDeleteTask();
  const { theme } = useThemeContext();
  const { tasks } = useTasks();
  const navigate = useNavigate();

  const cardBg =
    theme === "light"
      ? "bg-gradient-to-br from-[#E8F0EE] to-[#D9E4EC] text-[#2F3E46]"
      : "bg-gradient-to-br from-[#1C1C1C] to-[#2A2A2A] text-gray-100";
  const btnPrimary =
    theme === "light"
      ? "bg-[#3C5556] hover:bg-[#2C4445] text-white"
      : "bg-gray-700 hover:bg-gray-600 text-white";
  const btnCancel =
    theme === "light"
      ? "border-[#3C5556] text-[#3C5556]"
      : "border-gray-400 text-gray-300";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-center px-4 min-h-screen"
    >
      <Card
        component={motion.div}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`w-full max-w-md rounded-2xl shadow-xl p-8 ${cardBg}`}
      >
        <CardContent className="text-center space-y-6">
          <motion.h2
            className="text-2xl font-semibold"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            Delete All Tasks
          </motion.h2>

          {tasks.length === 0 ? (
            <p className="text-sm italic opacity-80">No tasks to delete.</p>
          ) : (
            <>
              <p className="text-sm opacity-80">
                Are you sure you want to delete <b>all your tasks</b>?<br />
                This action <span className="text-red-500 font-semibold">cannot be undone</span>.
              </p>

              {error && (
                <p className="text-red-500 text-sm font-medium">{error}</p>
              )}

              <div className="flex justify-center gap-3 pt-2">
                <Button
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(-1)}
                  variant="outline"
                  className={`${btnCancel}`}
                >
                  Cancel
                </Button>

                <Button
                  component={motion.button}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={deleteAllTasks}
                  disabled={loading}
                  className={`${btnPrimary}`}
                >
                  {loading ? "Deleting..." : "Delete All"}
                </Button>
              </div>
            </>
          )}

          <div className="pt-4">
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variant="outline"
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-sm mx-auto border-gray-400 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <ArrowLeft size={16} /> Back to To-Do
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
