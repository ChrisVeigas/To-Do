import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { useTaskActions } from "../hooks/useTaskActions";
import { Button } from "../components/ui/button";
import { Tooltip } from "../components/ui/Tooltip";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/ui/accordion";
import { Plus, Trash2, Edit } from "lucide-react";

function ToDo() {
  const { tasks } = useTasks();
  const { deleteTask } = useTaskActions();
  const navigate = useNavigate();

  return (
    <div
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="px-4 pt-6 pb-10 w-full max-w-[1400px] mx-auto"
    >
      {tasks.length === 0 ? (
        <p
          component={motion.p}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-left text-emerald-450 italic text-sm mt-6"
        >
          No tasks yet. Add one using the “+” button.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 justify-start items-start">
          {tasks.map((task, index) => (
            <div
              key={task._id}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl shadow-xl p-5 flex flex-col justify-between 
             bg-linear-to-br from-[#E8F0EE] to-[#D9E4EC] 
             border border-white/40 backdrop-blur-md text-[#2F3E46]
             w-[220px] min-h-[220px] transition-all duration-300"
            >
              <Accordion type="single" collapsible>
                <AccordionItem value="item">
                  <AccordionTrigger className="text-lg font-semibold text-[#011956] hover:text-white transition">
                    {task.title}
                  </AccordionTrigger>

                  <AccordionContent>
                    <p
                      component={motion.p}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      className="text-sm text-[#011956] whitespace-pre-wrap wrap-break-word"
                    >
                      {task.description}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="flex justify-between items-center mt-3 space-x-4">
                <Tooltip label="Edit Task">
                  <Button
                    component={motion.button}
                    size="sm"
                    transition={{ duration: 0.15 }}
                    onClick={() => navigate(`/edit/${task._id}`)}
                    className="bg-[#E9F1EF] text-[#3C5556] hover:bg-[#d6e5e2]"
                  >
                    <Edit size={16} />
                  </Button>
                </Tooltip>

                <Tooltip label="Delete Task">
                  <Button
                    component={motion.button}
                    size="sm"
                    variant="destructive"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    <Trash2 size={16} />
                  </Button>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Floating Buttons */}
      <div
        component={motion.div}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed bottom-6 right-6 flex flex-col gap-3"
      >
        <Tooltip label="Add Task">
          <Button
            component={motion.button}
            size="lg"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.15 }}
            onClick={() => navigate("/add")}
            className="bg-[#E9F1EF] text-[#3C5556] hover:bg-[#d6e5e2] shadow-lg"
          >
            <Plus size={20} />
          </Button>
        </Tooltip>

        <Tooltip label="Delete Task">
          <Button
            component={motion.button}
            size="lg"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.15 }}
            onClick={() => navigate("/delete")}
            className="bg-[#3C5556] text-white hover:bg-[#2C4445] shadow-lg"
          >
            <Trash2 size={20} />
          </Button>
        </Tooltip>
      </div>
    </div>
  );
}

export default ToDo;
