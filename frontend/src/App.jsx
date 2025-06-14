import { useEffect, useState } from "react";
import axios from "axios";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:8000/tasks")
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleTaskAdd = (task) => {
    setTasks(prev => [...prev, task]);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">📝 Task Tracker</h1>
          <button
            onClick={() => setDarkMode(prev => !prev)}
            className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded text-sm"
          >
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>
        <TaskForm onTaskAdd={handleTaskAdd} />
        <TaskList tasks={tasks} setTasks={setTasks} />
      </div>
    </div>
  );
};

export default App;
