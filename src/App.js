
import './App.css';
import React, {useState} from "react";

function App() {

  let id=0;
  const [todo, setTodo]=useState([]);

  const [error, setError]=useState("");

  const [inputValue, setInputValue]=useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleAddButton= ()=> {
    if (inputValue.length === 0 ) {
      setError ("Please Enter Todo Task");
      return;
    } else {
      setError("");
      setTodo ([...todo, {text: inputValue, id:id+1, status: "Active"}]);
      setInputValue("");
    }
  }
  console.log(todo);
  
  return (
    
    <div class="Todo-List">

    <div class ="Main">
   <h2>To-Do list</h2>

   <div class="Gol">
   <button class="Text">Add a new task...</button>
   <button class="Add">Add</button>
   </div>

   <div class="All">
   <button>All</button>
   <button>Active</button>
   <button>Completed</button>
   </div>
   
   <div class="Name">
   <div>No task yet. Add one above!</div>
   <div>Powered by Pinecone academy </div>
   </div>
  </div>

  </div>
  );
}





export default App;
