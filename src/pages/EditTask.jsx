import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useEditTask } from "../hooks/useEditTask";

export default function EditTask() {
  const { title, description, setTitle, setDescription, handleSubmit } =
    useEditTask();

  return (
    <div className="flex justify-center items-center min-h-screen bg-linear-to-b from-[#E9F1EF] to-[#CADBD8] px-4">
      <Card
        component={motion.div}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg rounded-2xl shadow-xl bg-white"
      >
        <CardContent className="p-8">
          <motion.h2
            className="text-2xl font-bold text-center text-[#3C5556] mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            ✏️ Edit Task
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter task title"
                className="focus-visible:ring-[#3C5556]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task details"
                className="focus-visible:ring-[#3C5556]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="border-[#3C5556] text-[#3C5556]"
                >
                  Cancel
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  type="submit"
                  className="bg-[#3C5556] hover:bg-[#2C4445] text-white"
                >
                  Save Changes
                </Button>
              </motion.div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
