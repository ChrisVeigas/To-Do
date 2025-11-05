import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../components/ui/card";
import { useLoginForm } from "../hooks/useLoginForm";
import { useThemeContext } from "../context/ThemeContext";

export default function Login() {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isSubmitting,
    errorMessage,
  } = useLoginForm();

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
  const linkColor = theme === "light" ? "text-[#3C5556]" : "text-gray-100";

  return (
    <div
      className={`flex items-center justify-center px-4 transition-colors duration-500`}
    >
      <Card
        className={`${cardBg} backdrop-blur-sm rounded-2xl shadow-xl p-6 flex flex-col justify-center transition-colors duration-500`}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          component={motion.div}
          className="space-y-4"
        >
          <CardHeader className="p-0 text-center">
            <CardTitle className="text-2xl font-semibold">Login</CardTitle>
          </CardHeader>

          <CardContent className="p-0 space-y-3">
            <div>
              <label className={`block text-sm font-medium mb-1 ${labelColor}`}>
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className={`${inputFocus}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className={`block text-sm font-medium mb-1 ${labelColor}`}>
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                className={`${inputFocus}`}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {errorMessage && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-500 text-sm text-center mt-2"
              >
                {errorMessage}
              </motion.p>
            )}
          </CardContent>

          <CardFooter className="p-0 flex flex-col gap-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className={`w-full ${
                theme === "light" ? "bg-[#3C5556]" : "bg-gray-700"
              } text-white transition-colors duration-500`}
            >
              {isSubmitting ? "Logging In" : "Login"}
            </Button>

            <p className={`text-sm text-center ${labelColor}`}>
              Don't have an account?{" "}
              <Link
                to="/register"
                className={`${linkColor} hover:underline font-medium`}
              >
                Register
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
