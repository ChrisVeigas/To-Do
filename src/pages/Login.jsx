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
      theme === "light" ? "bg-white/95 text-[#3C5556]" : "bg-[#1E1E1E] text-gray-100";
    const inputFocus =
      theme === "light" ? "focus-visible:ring-[#3C5556]" : "focus-visible:ring-gray-300";
    const labelColor = theme === "light" ? "text-gray-700" : "text-gray-300";
    const linkColor = theme === "light" ? "text-[#3C5556]" : "text-gray-100";
    const bgGradient =
      theme === "light"
        ? "bg-gradient-to-b from-[#E9F1EF] via-[#E9F1EF] to-[#E9F1EF]"
        : "bg-gradient-to-b from-[#0F0F0F] via-[#1A1A1A] to-[#2C2C2C]";

    return (
      <motion.div
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`flex items-center justify-center min-h-screen ${bgGradient} px-4 transition-colors duration-500`}
      >
        <Card
          component={motion.div}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className={`w-full max-w-sm ${cardBg} backdrop-blur-sm rounded-2xl shadow-xl p-6 flex flex-col justify-center transition-colors duration-500`}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            component={motion.div}
            className="space-y-4"
          >
            <CardHeader
              component={motion.div}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-0 text-center"
            >
              <CardTitle className="text-2xl font-semibold">Login</CardTitle>
            </CardHeader>

            <CardContent
              component={motion.div}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="p-0 space-y-3"
            >
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

            <CardFooter
              component={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="p-0 flex flex-col gap-3"
            >
              <Button
                component={motion.button}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${
                  theme === "light"
                    ? "bg-[#3C5556] hover:bg-[#2C4445]"
                    : "bg-gray-700 hover:bg-gray-600"
                } text-white transition-colors duration-500`}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>

              <p className={`text-sm text-center ${labelColor}`}>
                Don’t have an account?{" "}
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
      </motion.div>
    );
  }
