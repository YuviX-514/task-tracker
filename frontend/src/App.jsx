import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  // Load from localStorage on app load
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Optional: fetch from backend (can keep or remove)
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/tasks`)
      .then((res) => setTasks(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Toggle dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleTaskAdd = (task) => {
    setTasks((prev) => [...prev, task]);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">📝 Task Tracker</h1>
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded text-sm"
          >
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>
        <TaskForm onTaskAdd={handleTaskAdd} />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </div>
      <footer className="mt-10 text-center text-xs text-gray-500 dark:text-gray-400 italic">
        © 2025 — Maintained by{" "}
        <span className="font-semibold text-red-600 dark:text-red-400">
          Lucifer
        </span>
        .
        <br />
        “Hell hath no fury like unfinished tasks.” 😈
      </footer>
    </div>
  );
};

export default App;
