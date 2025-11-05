import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";
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
    inputRef,
  } = useEditAccount();

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
        <CardTitle className="text-2xl font-semibold">
          ⚙️ Edit Account
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
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
              className={`${inputFocus}`}
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
              className={`${inputFocus}`}
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
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
        </form>
      </CardContent>
    </Card>
  );
}
