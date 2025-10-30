import { motion } from "framer-motion";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { useDeleteAccount } from "../hooks/useDeleteAccount";
import { useThemeContext } from "../context/ThemeContext";

export default function DeleteAccount() {
  const { deleteAccount, loading, error } = useDeleteAccount();
  const { theme } = useThemeContext();

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
  const bgGradient =
    theme === "light"
      ? "bg-gradient-to-b from-[#E9F1EF] via-[#E9F1EF] to-[#E9F1EF]"
      : "bg-gradient-to-b from-[#0F0F0F] via-[#1A1A1A] to-[#2C2C2C]";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center justify-center min-h-screen ${bgGradient} px-4`}
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
            Delete Account
          </motion.h2>

          <p className="text-sm opacity-80">
            This action cannot be undone. All your data and tasks will be
            permanently deleted.
          </p>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <div className="flex justify-center gap-3 pt-2">
            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.history.back()}
              variant="outline"
              className={`${btnCancel}`}
            >
              Cancel
            </Button>

            <Button
              component={motion.button}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={deleteAccount}
              disabled={loading}
              className={`${btnPrimary}`}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
