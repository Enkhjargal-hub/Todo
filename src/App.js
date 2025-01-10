
import './App.css';
import React, { useState } from "react";
import moment from 'moment';
import InputSection from './components/InputSection';
import TaskList from './components/TaskList';
import Filter from './components/Filterr';
import Footer from './components/Footer';

function App() {
  const [todo, setTodo] = useState([]);
  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [filterState, setFilterState] = useState("All");

  const handleInputChange = (event) => setInputValue(event.target.value);

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
    setTodo((prevTodo) =>
      prevTodo.map((task) =>
        task.id === id
          ? { ...task, deletedAt: moment().format('YYYY-MM-DD HH:mm:ss') }
          : task
      )
    );
  };

  const filteredTodos = todo.filter((task) => {
    if (filterState === "All") return !task.deletedAt; // Устгагдаагүй бүх task-ууд
    if (filterState === "Log") return !!task.deletedAt; // Зөвхөн устгагдсан task-ууд
    return task.status === filterState && !task.deletedAt; // Active эсвэл Completed статус бүхий устгагдаагүй task-ууд
  });
  
  const isLogView = filterState === "Log";

  return (
    <div className="Todo-App">
      <div className="Main">
        <h2 className="Header">To-Do List</h2>
        <InputSection
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          handleAddButton={handleAddButton}
          error={error}
        />
        <Filter filterState={filterState} setFilterState={setFilterState} />
        <TaskList tasks={filteredTodos} handleBox={handleBox} handleDelete={handleDelete} isLogView={isLogView} />
        <Footer />
      </div>
    </div>
  );
}

export default App;







