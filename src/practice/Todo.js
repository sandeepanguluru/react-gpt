import React, { useEffect, useState } from "react";
import TodoComp from "../components/todoComponent/todoComp";
import { CircularProgress } from "@mui/material";

// export const AddTodoList = () => {
//   const [count, setCount] = useState(0);
//   const handleIncreament = () => {
//     setCount((prev) => prev + 1);
//   };
//   const hanldeDecreament = () => {
//     setCount((prev) => prev - 1);
//   };
//   const handleReset=()=>{
//     setCount(0)
//   }
//   return (
//     <>
//       <h1>Count : {count} </h1>
//       <button onClick={handleIncreament}>Increament</button>
//       <button onClick={hanldeDecreament}>Decreament</button>
//       <button onClick={handleReset}>Reset</button>
//     </>
//   );
// };

export const AddTodoList = () => {
  const ui = () => {
    const ux = localStorage.getItem("saveTodo");
    return ux ? JSON.parse(ux) : [];
  };

  const [inputValue, setInputValue] = useState("");

  const [todo, setTodo] = useState(ui);
  const [error, setError] = useState("");
  const [edit, setEdit] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    localStorage.setItem("saveTodo", JSON.stringify(todo));
  }, [todo]);
  const handleAdd = () => {
    if (inputValue.trim() === "") {
      setError("required");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      if (edit !== null) {
        const updated = [...todo];
        updated[edit] = inputValue;
        setTodo(updated);
        setEdit(null);
      } else {
        setTodo([...todo, inputValue]);
      }
      setInputValue("");
      setLoading(false);
    }, 1000);
  };
  const handleReset = () => {
    setTodo([]);
    setInputValue("");
    localStorage.removeItem("saveTodo");
  };
  const handleDel = (idDel) => {
    // setTodo(todo.filter((_,index)=>index !== idDel))
    let list = [...todo];
    list.splice(idDel, 1);
    setTodo(list);
  };
  const handleEdit = (idEdit) => {
    setInputValue(todo[idEdit]);
    setEdit(idEdit);
  };
  return (
    <>
      <h1>Todo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleAdd();
          }
        }}
      />
      <button style={{ cursor: "pointer" }} onClick={handleAdd}>
        {edit !== null ? "Update" : "Add Todo"}
      </button>
      <button style={{ cursor: "pointer" }} onClick={handleReset}>
        Reset{" "}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <br/>
      {loading && <CircularProgress size={20}/>}
      <ul>
        {todo.length == 0 ? (
          <p>No Todo Here</p>
        ) : (
          todo.map((item, index) => {
            return (
              <>
                <TodoComp
                  item={item}
                  index={index}
                  onEdit={handleEdit}
                  onDelete={handleDel}
                  isEditing={edit === index}
                />

                {/* <li key={index}>
                {item}
                {edit === index && (
                  <p style={{ color: "orange" }}>Editing...</p>
                )}
              </li>
              <button onClick={() => handleDel(index)}>Del</button>
              <button onClick={() => handleEdit(index)}>Edit</button> */}
              </>
            );
          })
        )}
      </ul>
    </>
  );
};
