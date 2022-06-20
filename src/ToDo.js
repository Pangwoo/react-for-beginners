import {useState, useEffect} from "react";

function ToDo() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => {
    setToDo(event.target.value);
    console.log(toDo);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if(toDo === ""){
      return;
    }
    setToDos((currentArray) => [toDo, ...currentArray]);
    setToDo("");
  };
  return (
    <div>
      <h1>My TO Dos : {toDos.length}</h1>
      <form onSubmit={onSubmit}>
        <input 
          value = {toDo} 
          onChange = {onChange}
          type="text" 
          placeholder="Write your to do..." 
        />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((toDo, index) => <li key={index}>{toDo}</li>)}
      </ul>
    </div>
  );
}

export default ToDo;