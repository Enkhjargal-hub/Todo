
import './App.css';
import React, { useState } from "react";

function App() {
  const [todo, setTodo] = useState([]);
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [filterState, setFilterState] = useState("All");

  // Handle input change
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Handle adding a task
  const handleAddButton = () => {
    if (inputValue.trim().length === 0) {
      setError("Please Enter a Todo Task");
    } else {
      setError("");
      setTodo([
        ...todo,
        { text: inputValue.trim(), id: Date.now(), status: "Active" },
      ]);
      setInputValue(""); // Clear input field
    }
  };

  // Handle toggling task status
  const handleBox = (id) => {
    setTodo((prevTodo) =>
      prevTodo.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "Completed" ? "Active" : "Completed" }
          : task
      )
    );
  };

  // Handle deleting a task
  const handleDelete = (id) => {
    const taskToDelete = todo.find((task) => task.id === id);
    if (taskToDelete && taskToDelete.status !== "Completed") {
      setError("Only completed tasks can be deleted!");
      setTimeout(() => setError(""), 3000); // Clear error after 3 seconds
      return;
    }

    setTodo((prevTodo) => prevTodo.filter((task) => task.id !== id));
  };

  // Filter tasks based on filterState
  const filteredTodos = todo.filter((task) => {
    if (filterState === "All") return true;
    return task.status === filterState;
  });

  // Calculate total and completed tasks
  const totalTasks = todo.length;
  const completedTasks = todo.filter((task) => task.status === "Completed").length;

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
            <button className="Filter-1" onClick={() => setFilterState("All")}>
              All
            </button>
            <button className="Filter-1" onClick={() => setFilterState("Active")}>
              Active
            </button>
            <button className="Filter-1" onClick={() => setFilterState("Completed")}>
              Completed
            </button>
          </div>

          {filteredTodos.length === 0 ? (
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

        <div className="Footer">
          <div>Powered by</div>
          <div className="Done">Pinecone academy</div>
        </div>
      </div>
    </div>
  );
}

export default App;




