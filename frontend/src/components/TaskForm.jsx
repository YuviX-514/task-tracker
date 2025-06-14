import { useState } from "react";
import axios from "axios";

const TaskForm = ({ onTaskAdd }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/tasks`, { title });
    onTaskAdd(res.data);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4 gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter a task..."
        className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Add
      </button>
    </form>
  );
};

export default TaskForm;
