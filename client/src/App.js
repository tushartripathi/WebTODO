import React, { Component } from 'react';

import { useState, useEffect } from 'react';
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;

const API_BASE = "http://localhost:3000";

function App()
{
  const [todos , setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(()=>{
   
    GetTodos();
    console.log(todos);
  },[])

  const GetTodos = ()=>{
    console.log("123213");
    fetch(API_BASE +"/todos")
        .then(res=> res.json())
        .then(data => setTodos(data))
        .catch(err => console.error("Error: ",err));

  }

  const completeTodo = async id =>{
    const data = await fetch(API_BASE + "/todos/completed/"+id)
        .then(res => res.json());
          
         setTodos(tods => todos.map(todo => {
        
            if(todo._id === data._id)
            {
              todo.complete = data.complete;
            }
            return todo;
        }))
  }

  const deleteTods = async id =>{
    const data = await fetch(API_BASE + "/todos/delete/"+id,{ method:"DELETE"})
        .then(res => res.json());
      
        setTodos(tods => tods.filter(todo => todo._id !== data._id));

  }

  return (
    <div className="App">
      <h1>Welcome, Tyler</h1>
      <h4>youre Tasks</h4>
      <div className="todos">
        {
          todos.map(todo=>(
            <div className={"todo " + (todo.complete ? "is-complete":"")} key={todo._id} onClick={() =>completeTodo(todo._id)}>
            <div className="checkbox"></div>
            <div className="text">{todo.text}</div>
  
            <div className="delete-todo" onClick={()=>deleteTods(todo._id)}>X</div>
          </div>
          ))}
       
      </div>
        
    </div>
  );
}

export default App;