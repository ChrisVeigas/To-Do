import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { useTaskActions } from "../hooks/useTaskActions";
import { Button } from "../components/ui/button";
import { Tooltip } from "../components/ui/Tooltip";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus, Trash2, Edit } from "lucide-react";
import { useThemeContext } from "../context/ThemeContext";

function ToDo() {
  const { tasks } = useTasks();
  const { deleteTask } = useTaskActions();
  const navigate = useNavigate();
  const { theme } = useThemeContext();

  const cardBg =
    theme === "light"
      ? "bg-gradient-to-br from-[#E8F0EE] to-[#D9E4EC] text-[#2F3E46]"
      : "bg-gradient-to-br from-[#1C1C1C] to-[#2A2A2A] text-gray-100";

  const btnDelete =
    theme === "light"
      ? "bg-[#3C5556] hover:bg-[#2C4445] text-white"
      : "bg-gray-700 hover:bg-gray-600 text-white";

  const btnEdit =
    theme === "light"
      ? "border border-[#3C5556] text-[#3C5556] hover:bg-[#E9F1EF]"
      : "border border-gray-400 text-gray-300 hover:bg-gray-800";

  const labelColor = theme === "light" ? "text-gray-700" : "text-gray-300";

  const floatingBtn =
    theme === "light"
      ? "bg-[#E9F1EF] text-[#3C5556] hover:bg-[#d6e5e2]"
      : "bg-[#475569] text-[#f1f5f9] hover:bg-[#64748b]";

  const floatingBtnDanger =
    theme === "light"
      ? "bg-[#3C5556] text-white hover:bg-[#2C4445]"
      : "bg-[#ef4444] text-white hover:bg-[#dc2626]";

  return (
    <div className="px-4 transition-colors duration-500">
      {tasks.length === 0 ? (
        <div className="flex flex-col items-center mt-10 space-y-4">
          <p className={`text-center italic text-sm mt-4 ${labelColor}`}>
            No tasks yet. Add one using the “+” button.
          </p>
        </div>
      ) : (
        <div
          className="grid gap-8 justify-center px-4 py-8
            grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            auto-rows-auto place-items-center"
        >
          {tasks.map((task) => (
            <Card
              key={task._id}
              className={`${cardBg} backdrop-blur-sm rounded-2xl shadow-xl 
                p-6 flex flex-col justify-between transition-colors duration-500
                w-full max-w-sm h-[280px] sm:h-[300px]`}
            >
              <CardHeader className="p-0 text-center h-[50px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                <CardTitle className="text-lg font-semibold wrap-break-word">
                  {task.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-0 grow overflow-y-auto mt-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                <p
                  className={`text-sm whitespace-pre-wrap wrap-break-word leading-relaxed ${labelColor}`}
                >
                  {task.description}
                </p>
              </CardContent>

              <div className="flex justify-center gap-3 pt-4">
                <Tooltip label="Edit Task">
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/edit/${task._id}`)}
                    className={`${btnEdit}`}
                  >
                    <Edit size={16} />
                  </Button>
                </Tooltip>

                <Tooltip label="Delete Task">
                  <Button
                    onClick={() => deleteTask(task._id)}
                    className={`${btnDelete}`}
                  >
                    <Trash2 size={16} />
                  </Button>
                </Tooltip>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        <Tooltip label="Add Task">
          <Button
            size="lg"
            onClick={() => navigate("/add")}
            className={`${floatingBtn} shadow-lg rounded-full p-3 transition-transform duration-300 hover:scale-105`}
          >
            <Plus size={22} />
          </Button>
        </Tooltip>

        <Tooltip label="Delete All Tasks">
          <Button
            size="lg"
            onClick={() => navigate("/delete")}
            className={`${floatingBtnDanger} shadow-lg rounded-full p-3 transition-transform duration-300 hover:scale-105`}
          >
            <Trash2 size={20} />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}

export default ToDo;
