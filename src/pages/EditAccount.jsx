import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useEditAccount } from "../hooks/useEditAccount";
import { useThemeContext } from "../context/ThemeContext";

export default function EditAccount() {
  const {
    username,
    password,
    setUsername,
    setPassword,
    handleSubmit,
    loading,
    inputRef,
  } = useEditAccount();

  const { theme } = useThemeContext();

  const bgGradient =
    theme === "light"
      ? "bg-gradient-to-b from-[#E9F1EF] via-[#E9F1EF] to-[#CADBD8]"
      : "bg-gradient-to-b from-[#0F0F0F] via-[#1A1A1A] to-[#2C2C2C]";

  const cardBg =
    theme === "light"
      ? "bg-white/95 text-[#3C5556]"
      : "bg-[#1E1E1E]/95 text-gray-100";

  const labelColor = theme === "light" ? "text-gray-700" : "text-gray-300";
  const inputFocus =
    theme === "light"
      ? "focus:ring-[#3C5556] border-gray-300"
      : "focus:ring-gray-300 border-gray-600";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`flex justify-center items-center min-h-screen px-4 ${bgGradient} transition-colors duration-500`}
    >
      <Card
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className={`w-full max-w-md rounded-2xl shadow-xl ${cardBg} transition-colors duration-500`}
      >
        <CardContent className="p-8">
          <motion.h2
            className="text-2xl font-semibold text-center mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            ⚙️ Edit Account
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-1 ${labelColor}`}>
                New Username
              </label>
              <Input
                ref={inputRef}
                type="text"
                placeholder="Enter new username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`bg-transparent ${inputFocus}`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${labelColor}`}>
                New Password (optional)
              </label>
              <Input
                type="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`bg-transparent ${inputFocus}`}
              />
            </div>

            <div className="flex justify-end gap-3 pt-3">
              <Button
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variant="outline"
                type="button"
                onClick={() => window.history.back()}
                className={`border transition-colors duration-500 ${
                  theme === "light"
                    ? "border-[#3C5556] text-[#3C5556] hover:bg-gray-100"
                    : "border-gray-400 text-gray-200 hover:bg-[#2A2A2A]"
                }`}
              >
                Cancel
              </Button>

              <Button
                component={motion.button}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className={`text-white transition-colors duration-500 ${
                  theme === "light"
                    ? "bg-[#3C5556] hover:bg-[#2C4445]"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
