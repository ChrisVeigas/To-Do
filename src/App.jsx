import { Routes, Route, Navigate } from "react-router-dom";
import ToDo from "./components/ToDo";
import NavBar from "./components/Navbar";
import AddTask from "./pages/AddTask";
import DeleteTask from "./pages/DeleteTask";
import EditAccount from "./pages/EditAccount";
import EditTask from "./pages/EditTask";
import DeleteAccount from "./pages/DeleteAccount";
import { TaskProvider, useTasks } from "./context/TaskContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { UserProvider, useUser } from "./context/UserContext";
import Loader from "./components/Loader";
import { Toaster } from "sonner";
import { logger } from "./utils/logger";
import { ThemeProvider, useThemeContext } from "./context/ThemeContext";
import { useCustomScrollbar } from "./hooks/useScrollbar";

function PrivateRoute({ children }) {
  const { token } = useUser();
  return token ? children : <Navigate to="/register" />;
}

function AppContent() {
  const { loading } = useTasks();
  const { theme } = useThemeContext();
  useCustomScrollbar();

  logger.info("AppContent mounted and tasks context loaded");

  return (
    <>
      <Toaster position="top-right" richColors closeButton expand />

      {loading && <Loader />}

      <main
        className={`min-h-screen flex flex-col transition-colors duration-500 
        ${
          theme === "light"
            ? "bg-[#dcd8d8] text-[#3C5556]"
            : "bg-[#000000] text-gray-200"
        }`}
      >
        <NavBar />
        <div className="flex-1 flex items-center justify-center p-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/"
              element={
                <PrivateRoute>
                  <ToDo />
                </PrivateRoute>
              }
            />
            <Route
              path="/add"
              element={
                <PrivateRoute>
                  <AddTask />
                </PrivateRoute>
              }
            />
            <Route
              path="/delete"
              element={
                <PrivateRoute>
                  <DeleteTask />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <PrivateRoute>
                  <EditTask />
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-account"
              element={
                <PrivateRoute>
                  <EditAccount />
                </PrivateRoute>
              }
            />
            <Route
              path="/delete-account"
              element={
                <PrivateRoute>
                  <DeleteAccount />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </main>
    </>
  );
}

function App() {
  logger.info("🚀 App initialized");

  return (
    <ThemeProvider>
      <UserProvider>
        <TaskProvider>
          <AppContent />
        </TaskProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
