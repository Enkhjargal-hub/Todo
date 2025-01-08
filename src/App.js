
import './App.css';
import React, { useState } from "react";
import moment from 'moment';

function App() {
  const [todo, setTodo] = useState([]);
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [filterState, setFilterState] = useState("All");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddButton = () => {
    if (inputValue.trim().length === 0) {
      setError("Please Enter a Todo Task");
    } else {
      setError("");
      const newTask = {
        text: inputValue.trim(),
        id: Date.now(),
        status: "Active",
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        completedAt: null,
        deletedAt: null,
      };
      setTodo([...todo, newTask]);
      setInputValue("");
    }
  };

  const handleBox = (id) => {
    setTodo((prevTodo) =>
      prevTodo.map((task) =>
        task.id === id
          ? {
              ...task,
              status: task.status === "Completed" ? "Active" : "Completed",
              completedAt: task.status === "Completed" ? null : moment().format('YYYY-MM-DD HH:mm:ss'),
            }
          : task
      )
    );
  };

  const handleDelete = (id) => {
    setTodo((prevTodo) => prevTodo.filter((task) => task.id !== id));
  };

  const filteredTodos = todo.filter((task) => {
    if (filterState === "All") return true;
    if (filterState === "Log") return true; // Log should show all tasks with times
    return task.status === filterState;
  });

  const totalCount = todo.length;
  const completedCount = todo.filter((task) => task.status === "Completed").length;

  return (
    <div className="Todo-App">
      <div className="Main">
        <h2 className="Header">To-Do List</h2>

        <div className="Input-Section">
          <input
            placeholder="Add a new task..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleAddButton();
              }
            }}
          />
          <button className="Add" onClick={handleAddButton}>
            Add
          </button>
        </div>

        {error && <div className="Error">{error}</div>}

        <div className="Todo-List">
          <div className="Filter">
            <button
              className={`Filter-1 ${filterState === "All" ? "active" : ""}`}
              onClick={() => setFilterState("All")}
            >
              All
            </button>
            <button
              className={`Filter-1 ${filterState === "Active" ? "active" : ""}`}
              onClick={() => setFilterState("Active")}
            >
              Active
            </button>
            <button
              className={`Filter-1 ${filterState === "Completed" ? "active" : ""}`}
              onClick={() => setFilterState("Completed")}
            >
              Completed
            </button>
            <button
              className={`Filter-1 ${filterState === "Log" ? "active" : ""}`}
              onClick={() => setFilterState("Log")}
            >
              Log
            </button>
          </div>

          {filterState === "Log" ? (
            todo.length === 0 ? (
              <div className="No-Tasks">No logs available yet!</div>
            ) : (
              todo.map((task) => (
                <div key={task.id} className="Task">
                  <span>{task.text}</span>
                  <div className="Task-Times">
                    <span>Created: {task.createdAt}</span>
                    {task.status === "Completed" && <span>Completed: {task.completedAt}</span>}
                    {task.deletedAt && <span>Deleted: {task.deletedAt}</span>}
                  </div>
                </div>
              ))
            )
          ) : filteredTodos.length === 0 ? (
            <div className="No-Tasks">No tasks yet. Add one above!</div>
          ) : (
            filteredTodos.map((task) => (
              <div key={task.id} className="Task">
                <input
                  type="checkbox"
                  onChange={() => handleBox(task.id)}
                  checked={task.status === "Completed"}
                />
                <span>{task.text}</span>
                <button className="Delete" onClick={() => handleDelete(task.id)}>
                  Delete
                </button>
              </div>
            ))
          )}
        </div>

        {totalCount > 0 && (
          <div className="noo-tasks">
            <span className="task-count">
              {`${completedCount} of ${totalCount} tasks completed`}
            </span>
            {completedCount > 0 && (
              <button
                className="button-delete"
                onClick={() => setTodo(todo.filter((task) => task.status !== "Completed"))}
              >
                Clear completed
              </button>
            )}
          </div>
        )}

        <div className="Footer">
          <div>Powered by</div>
          <div className="Done">Pinecone academy</div>
        </div>
      </div>
    </div>
  );
}

export default App;






