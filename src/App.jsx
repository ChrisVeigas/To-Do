import { Routes, Route } from "react-router-dom";
import ToDo from "./components/ToDo";
import NavBar from "./components/Navbar";
import AddTask from "./pages/AddTask";
import { TaskProvider } from "./context/TaskContext";

function App() {
  return (
      <TaskProvider>
        <main className="min-h-screen bg-gradient-to-b from-[#AD5389] to-[#3C1053] flex flex-col">
          <NavBar />
          <div className="flex-1 flex items-center justify-center p-4">
            <Routes>
              <Route path="/" element={<ToDo />} />
              <Route path="/add" element={<AddTask />} />
            </Routes>
          </div>
        </main>
      </TaskProvider>
  );
}

export default App;
