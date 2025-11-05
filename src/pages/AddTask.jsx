import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { useAddTask } from "../hooks/useAddTask";
import { useThemeContext } from "../context/ThemeContext";

export default function AddTask() {
  const {
    register,
    handleSubmit,
    onSubmit,
    formState: { errors, isSubmitting },
  } = useAddTask();

  const { theme } = useThemeContext();

  const cardBg =
    theme === "light"
      ? "bg-white/95 text-[#3C5556]"
      : "bg-[#1E1E1E] text-gray-100";
  const inputFocus =
    theme === "light"
      ? "focus-visible:ring-[#3C5556]"
      : "focus-visible:ring-gray-300";
  const labelColor = theme === "light" ? "text-gray-700" : "text-gray-300";

  return (
    <div
      className={`flex items-center justify-center px-4 min-h-screen transition-colors duration-500`}
    >
      <Card
        className={`${cardBg} backdrop-blur-sm rounded-2xl shadow-xl p-6 flex flex-col justify-center transition-colors duration-500 w-full max-w-md`}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <CardHeader className="p-0 text-center">
            <CardTitle className="text-2xl font-semibold">
              Add New Task
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 space-y-3">
            <div>
              <label className={`block text-sm font-medium mb-1 ${labelColor}`}>
                Title
              </label>
              <Input
                type="text"
                placeholder="Enter task title"
                {...register("title", { required: "Task title is required" })}
                className={`${inputFocus}`}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${labelColor}`}>
                Description
              </label>
              <textarea
                placeholder="Enter task details"
                {...register("description")}
                className={`w-full px-3 py-2 rounded-md border focus:outline-none ${inputFocus} ${
                  theme === "light"
                    ? "border-gray-300 bg-white/80"
                    : "border-gray-600 bg-[#2C2C2C]"
                }`}
                rows="4"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-0 flex flex-col gap-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${
                theme === "light"
                  ? "bg-[#3C5556] hover:bg-[#2C4445]"
                  : "bg-gray-700 hover:bg-gray-600"
              } text-white transition-colors duration-500`}
            >
              {isSubmitting ? "Adding Task..." : "Add Task"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
