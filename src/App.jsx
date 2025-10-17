import { Routes, Route, Navigate } from "react-router-dom";
import ToDo from "./components/ToDo";
import NavBar from "./components/Navbar";
import AddTask from "./pages/AddTask";
import DeleteTask from "./pages/DeleteTask";
import { TaskProvider } from "./context/TaskContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { UserProvider, useUser } from "./context/UserContext";

function PrivateRoute({ children }) {
  const { token } = useUser();
  return token ? children : <Navigate to="/register" />;
}

function App() {
  return (
    <UserProvider>
      <TaskProvider>
        <main className="min-h-screen bg-gradient-to-b from-[#AD5389] to-[#3C1053] flex flex-col">
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
            </Routes>
          </div>
        </main>
      </TaskProvider>
    </UserProvider>
  );
}

export default App;
