
import './App.css';
import React, { useState } from "react";

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
      setError("Please Enter Todo Task");
      return;
    } else {
      setError("");
      setTodo([
        ...todo,
        { text: inputValue.trim(), id: Date.now(), status: "Active" },
      ]);
      setInputValue("");
    }
  };

  const handleBox = (id) => {
    setTodo((prevTodo) =>
      prevTodo.map((task) =>
        task.id === id
          ? { ...task, status: task.status === "Completed" ? "Active" : "Completed" }
          : task
      )
    );
  };

  const handleDelete = (id) => {
    setTodo((prevTodo) => prevTodo.filter((task) => task.id !== id));
  };

  const filteredTodos = todo.filter((task) => {
    if (filterState === "All") {
      return true;
    } else {
      return task.status === filterState;
    }
  });

  return (
    <div className="Todo-App">
      <div className="Main">
        <h2 class="Header">To-Do List</h2>

        <div className="Input-Section">
          <input 
            placeholder="Add a new task..."
            value={inputValue}
            onChange={handleInputChange}
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
            <div className="No-Tasks">No task yet. Add one above!</div>
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
