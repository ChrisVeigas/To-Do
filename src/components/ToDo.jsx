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
    <div
      className="px-4 pt-24 min-h-[calc(100vh-5rem)]
             transition-colors duration-500 
             overflow-y-auto 
             scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent
             flex flex-col items-center"
      style={{ overflowY: tasks.length > 4 ? "auto" : "hidden" }}
    >
      {tasks.length === 0 ? (
        <div className="grid place-items-center mt-10 space-y-4">
          <p className={`text-center italic text-sm mt-4 ${labelColor}`}>
            No tasks yet. Add one using the “+” button.
          </p>
        </div>
      ) : (
        <div
          className="grid gap-8 justify-center items-start pb-12 px-4
                     grid-cols-[repeat(auto-fit,minmax(280px,1fr))]
                     place-items-center w-full max-w-[1400px]"
        >
          {tasks.map((task) => (
            <Card
              key={task._id}
              className={`${cardBg} backdrop-blur-sm rounded-2xl shadow-xl 
                          grid grid-rows-[auto_1fr_auto] transition-colors duration-500
                          p-6 w-full max-w-sm h-[260px] sm:h-[280px]`}
            >
              <CardHeader
                className="p-0 text-left overflow-y-auto scrollbar-thin 
                           scrollbar-thumb-gray-400 scrollbar-track-transparent 
                           max-h-14"
              >
                <CardTitle
                  className="text-lg font-semibold leading-tight wrap-break-word"
                  title={task.title}
                >
                  {task.title}
                </CardTitle>
              </CardHeader>

              <CardContent
                className="p-0 mt-3 overflow-y-auto 
                           scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent
                           max-h-28"
              >
                <p
                  className={`text-sm whitespace-pre-wrap wrap-break-word leading-relaxed ${labelColor}`}
                >
                  {task.description}
                </p>
              </CardContent>

              <div className="grid grid-cols-2 gap-3 place-items-center pt-3">
                <Tooltip label="Edit Task">
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/edit/${task._id}`)}
                    className={btnEdit}
                  >
                    <Edit size={16} />
                  </Button>
                </Tooltip>

                <Tooltip label="Delete Task">
                  <Button
                    onClick={() => deleteTask(task._id)}
                    className={btnDelete}
                  >
                    <Trash2 size={16} />
                  </Button>
                </Tooltip>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="fixed bottom-6 right-6 grid gap-4 z-50">
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
