import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { useAddTask } from "../hooks/useAddTask";
import { useThemeContext } from "../context/ThemeContext";

function AddTask() {
  const {
    title,
    setTitle,
    description,
    setDescription,
    titleRef,
    handleSubmit,
  } = useAddTask();

  const { theme } = useThemeContext();

  const bgGradient =
    theme === "light"
      ? "bg-gradient-to-b from-[#E9F1EF] via-[#E9F1EF] to-[#E9F1EF]"
      : "bg-gradient-to-b from-[#0F0F0F] via-[#1A1A1A] to-[#2C2C2C]";

  const cardBg =
    theme === "light"
      ? "bg-white/95 text-[#3C5556]"
      : "bg-[#1E1E1E]/95 text-gray-100";

  const labelColor = theme === "light" ? "text-gray-700" : "text-gray-300";
  const inputBorder = theme === "light" ? "border-gray-300" : "border-gray-600";
  const inputFocus =
    theme === "light"
      ? "focus:ring-[#3C5556]"
      : "focus:ring-gray-300 focus:border-gray-400";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`flex items-center justify-center min-h-screen px-4 ${bgGradient} transition-colors duration-500`}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`max-w-md w-full p-6 ${cardBg} rounded-2xl shadow-xl transition-colors duration-500`}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Add New Task</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className={`block text-sm font-medium mb-1 ${labelColor}`}
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className={`w-full px-3 py-2 rounded-lg border ${inputBorder} focus:ring-2 ${inputFocus} focus:outline-none bg-transparent`}
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className={`block text-sm font-medium mb-1 ${labelColor}`}
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task details"
              className={`w-full px-3 py-2 rounded-lg border ${inputBorder} focus:ring-2 ${inputFocus} focus:outline-none bg-transparent`}
            />
          </div>

          <Button
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            variant="default"
            size="lg"
            className={`w-full py-2 text-white transition-colors duration-500 ${
              theme === "light"
                ? "bg-[#3C5556] hover:bg-[#2C4445]"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            Add Task
          </Button>
        </form>
      </motion.div>
    </motion.div>
  );
}

export default AddTask;
