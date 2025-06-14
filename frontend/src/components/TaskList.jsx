import axios from "axios";

const TaskList = ({ tasks, setTasks }) => {
  const toggleComplete = async (id, completed) => {
    const res = await axios.put(`http://localhost:8000/tasks/${id}`, {
      completed: !completed,
    });
    setTasks((prev) => prev.map((task) => (task._id === id ? res.data : task)));
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8000/tasks/${id}`);
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="flex items-start justify-between bg-white dark:bg-gray-800 rounded px-4 py-2 flex justify-between items-center shadow"
        >
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task._id, task.completed)}
              className="form-checkbox h-5 w-5"
            />
            <span
              className="break-words w-full whitespace-pre-wrap"
              style={{
                textDecoration: task.completed ? "line-through" : "none",
                cursor: "pointer",
                wordBreak: "break-word",
              }}
              onClick={() => toggleComplete(task._id, task.completed)}
            >
              {task.title}
            </span>
            <span className="text-xs text-gray-400">
    Created: {new Date(task.createdAt).toLocaleString()}
  </span>
          </div>
          <button
            onClick={() => deleteTask(task._id)}
            className="text-red-500 hover:text-red-700 text-xl"
          >
            ×
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
