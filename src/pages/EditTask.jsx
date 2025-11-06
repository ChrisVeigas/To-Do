import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useEditTask } from "../hooks/useEditTask";
import { useThemeContext } from "../context/ThemeContext";

export default function EditTask() {
  const { title, description, setTitle, setDescription, handleSubmit } =
    useEditTask();
  const { theme } = useThemeContext();

  const cardBg =
    theme === "light"
      ? "bg-white/95 text-[#3C5556]"
      : "bg-[#1E1E1E] text-gray-100";
  const btnPrimary =
    theme === "light"
      ? "bg-[#3C5556] hover:bg-[#2C4445] text-white"
      : "bg-gray-700 hover:bg-gray-600 text-white";
  const btnCancel =
    theme === "light"
      ? "border-[#3C5556] text-[#3C5556]"
      : "border-gray-400 text-gray-300";
  const inputFocus =
    theme === "light"
      ? "focus-visible:ring-[#3C5556]"
      : "focus-visible:ring-gray-300";
  const labelColor = theme === "light" ? "text-gray-700" : "text-gray-300";

  return (
    <Card
      className={`${cardBg} backdrop-blur-sm rounded-2xl shadow-xl p-6 flex flex-col justify-center transition-colors duration-500 w-full max-w-md`}
    >
      <CardHeader className="p-0 text-center">
        <CardTitle className="text-2xl font-semibold">📝 Edit Task</CardTitle>
      </CardHeader>

      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className={`block text-sm font-medium mb-1 ${labelColor}`}>
              Title
            </label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
              className={`${inputFocus}`}
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-1 ${labelColor}`}>
              Description
            </label>
            <Textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task details"
              className={`w-full px-3 py-2 rounded-md border focus:outline-none ${inputFocus} ${
                theme === "light"
                  ? "border-gray-300 bg-white/80"
                  : "border-gray-600 bg-[#2C2C2C]"
              }`}
            />
          </div>
          <CardFooter className="p-0 flex flex-col gap-3">
            <div className="flex justify-end gap-3 w-full">
              <Button
                variant="outline"
                onClick={() => window.history.back()}
                className={`${btnCancel}`}
              >
                Cancel
              </Button>

              <Button type="submit" className={`${btnPrimary}`}>
                Save Changes
              </Button>
            </div>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
