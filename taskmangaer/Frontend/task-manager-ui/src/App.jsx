import { useEffect, useState } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./App.css";

function App() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [filter, setFilter] = useState("all");
  const [showCalendar, setShowCalendar] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get("http://localhost:8080/api/tasks");
    setTasks(response.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;

    await axios.post("http://localhost:8080/api/tasks", {
      title,
      description,
      completed: false,
      completedAt: null
    });

    setTitle("");
    setDescription("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8080/api/tasks/${id}`);
    fetchTasks();
  };

  const toggleCompleted = async (task) => {

    const updatedTask = {
      ...task,
      completed: !task.completed
    };

    await axios.put(
      `http://localhost:8080/api/tasks/${task.id}`,
      updatedTask
    );

    fetchTasks();
  };

  // FILTER LOGIC
  const filteredTasks = tasks.filter(task => {

    if (filter === "completed") return task.completed;

    if (filter === "pending") return !task.completed;

    return true;
  });

return (

  <div className="page">

    {/* NAVBAR */}
    <div className="navbar">

      <div className="nav-title">
        📝 Task Manager
      </div>

      <div className="nav-buttons">

        <button onClick={() => {
          setFilter("all");
          setShowCalendar(false);
        }}>
          All
        </button>

        <button onClick={() => {
          setFilter("pending");
          setShowCalendar(false);
        }}>
          Pending
        </button>

        <button onClick={() => {
          setFilter("completed");
          setShowCalendar(false);
        }}>
          Completed
        </button>

        <div className="calendar-container">

          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="calendar-btn"
          >
            Calendar
          </button>

          {showCalendar && (
            <div className="calendar-dropdown">
              <Calendar />
            </div>
          )}

        </div>

      </div>

    </div>


    {/* CENTER CARD */}
    <div className="main-card">

      {/* INPUT */}
      <div className="input-section">

        <input
          className="input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
        />

        <input
          className="input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task description"
        />

        <button className="add-btn" onClick={addTask}>
          Add Task
        </button>

      </div>


      {/* COUNT */}
      <div className="task-count">
        Total Tasks: {filteredTasks.length}
      </div>


      {/* TASK LIST */}
      <div className="task-list">

        {filteredTasks.map(task => (

          <div className="task-card" key={task.id}>

            <div className="task-left">

              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompleted(task)}
              />

              <div>

                <div className="task-title">
                  {task.title}
                </div>

                <div className="task-desc">
                  {task.description}
                </div>

                <div className="task-status">
                  {task.completed ? "✅ Completed" : "⏳ Pending"}
                </div>

                {task.completed && task.completedAt && (

                  <div className="task-time">
                    {new Date(task.completedAt).toLocaleString()}
                  </div>

                )}

              </div>

            </div>


            <button
              className="delete-btn"
              onClick={() => deleteTask(task.id)}
            >
              ❌
            </button>

          </div>

        ))}

      </div>

    </div>

  </div>
);

}

export default App;
