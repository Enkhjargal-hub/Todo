
import './App.css';
import React, { useState } from "react";
import moment from 'moment';

function App() {
  const [todo, setTodo] = useState([]);  // Бүх кодыг хадгална. Эхний утга нь хоосон массив./
  const [error, setError] = useState("");  // Хэрэглэгч алдаа гаргасан тохиолдолд мессеж хадгалах хувьсагч./
  const [inputValue, setInputValue] = useState(""); // Хэрэглэгчийн оруулсан текстийг хадгалах хувьсагч./
  const [filterState, setFilterState] = useState("All"); // Шүүнэ. (All, Active, Completed, Log гэх мэт).

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };  // Оруулсан текстийн утгыг inputValue-д хадгална./

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
  };  // Шинэ таск нэмж одоогийн жагсаалтанд нэмсэний дараа ажиллана. Хоосон текст оруулахыг зөвшөөрөхгүй./

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
  }; // Тухайн таскыг идэвхтэй эсвэл дуусгасан гэж тэмдэглэнэ. Дууссан тохиолдолд дууссан хугацааг хадгална./

  const handleDelete = (id) => {
    setTodo((prevTodo) =>
      prevTodo.map((task) =>
        task.id === id
          ? { ...task, deletedAt: moment().format('YYYY-MM-DD HH:mm:ss') }
          : task
      )
    );
  }; // Тухайн таскыг жагсаалтаас устгана. (Гэхдээ устгахгүй, deletedAt-д хадгална)

  const filteredTodos = todo.filter((task) => {
    if (filterState === "All") return !task.deletedAt; 
    if (filterState === "Log") return !!task.deletedAt; 
    return task.status === filterState && !task.deletedAt; 
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
         
          {filterState === "Log" ? (
            todo.filter((task) => task.deletedAt).length === 0 ? (
              <div className="No-Tasks">No logs available yet!</div>
            ) : (
              todo
                .filter((task) => task.deletedAt)
                .map((task) => (
                  <div key={task.id} className="Task">
                    <span>{task.text}</span>
                    <div className="Task-Times">
                      <span>Created: {task.createdAt}</span>
                      {task.status === "Completed" && <span>Completed: {task.completedAt}</span>}
                      <span>Deleted: {task.deletedAt}</span>
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







