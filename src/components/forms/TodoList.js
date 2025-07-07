import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

export function Todo() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const [todo, setTodo] = useState(() => {
    // Load initial state from localStorage just once
    const saved = localStorage.getItem("myTodos");
    return saved ? JSON.parse(saved) : [];
  });

  // Save todos to localStorage whenever `todo` changes
  useEffect(() => {
    localStorage.setItem("myTodos", JSON.stringify(todo));
    console.log("Saved to localStorage:", todo);
  }, [todo]);

  const handleClick = () => {
    if (value.trim() === "") {
      setError("required");
      return;
    }
    setTodo([...todo, value.trim()]);
    setValue("");
    setError("");
  };

  const handleDelete = (indexToDelete) => {
    const updatedTodos = todo.filter((_, index) => index !== indexToDelete);
    setTodo(updatedTodos);
  };

  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter a fruits"
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Button onClick={handleClick}>Add</Button>

      <ul>
        {todo.map((item, index) => (
          <li key={index}>
            {item}
            <Button
              onClick={() => handleDelete(index)}
              style={{ marginLeft: "8px" }}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// --------CRUD------------

// import React, { useEffect, useState } from "react";
// import TodoComp from "../todoComponent/todoComp";

// export function Todo() {
//   // 📦 Load todos from localStorage only once when component mounts
//   const loadTodo = () => {
//     const saved = localStorage.getItem("myTodo");
//     return saved ? JSON.parse(saved) : [];
//   };

//   // 🧠 State variables
//   const [fruits, setFruits] = useState(""); // Input value
//   const [message, setMessage] = useState(""); // Error message
//   const [todoList, setTodoList] = useState(loadTodo); // Todo list array
//   const [editIndex, setEditIndex] = useState(null); // Track edit mode

//   // 💾 Save todos to localStorage whenever todoList changes
//   useEffect(() => {
//     localStorage.setItem("myTodo", JSON.stringify(todoList));
//   }, [todoList]);

//   // ➕ Add or ✏️ Update item
//   const handleAdd = () => {
//     if (fruits.trim() === "") {
//       setMessage("Required");
//       return;
//     }

//     if (editIndex !== null) {
//       // ✏️ Update existing item
//       const updated = [...todoList];
//       updated[editIndex] = fruits;
//       setTodoList(updated);
//       setEditIndex(null);
//     } else {
//       // ➕ Add new item
//       setTodoList([...todoList, fruits]);
//     }

//     // Reset input and message
//     setFruits("");
//     setMessage("");
//   };

//   // ✏️ Start editing a specific item
//   const handleEdit = (index) => {
//     setFruits(todoList[index]); // Show existing value in input
//     setEditIndex(index); // Switch to edit mode
//   };

//   // ❌ Delete item
//   const handleDelete = (indexToDelete) => {
//     setTodoList(todoList.filter((_, i) => i !== indexToDelete));

//     // If currently editing the item being deleted, reset edit mode
//     if (editIndex === indexToDelete) {
//       setFruits("");
//       setEditIndex(null);
//     }
//   };

//   return (
//     <div>
//       <h2>My Todo List</h2>

//       {/* Input Field */}
//       <input
//         type="text"
//         value={fruits}
//         onChange={(e) => setFruits(e.target.value)}
//         placeholder="Enter fruits"
//       />

//       {/* Error Message */}
//       {message && <p style={{ color: "red" }}>{message}</p>}

//       {/* Add/Update Button */}
//       <button onClick={handleAdd}>
//         {editIndex !== null ? "Update" : "Add"}
//       </button>

//       {/* Render Todo List */}
//       {todoList.length > 0 ? (
//         <ul>
//           {todoList.map((item, index) => (
//             // <li key={index}>
//             //   {item}
//             //   <button onClick={() => handleEdit(index)}>Edit</button>
//             //   <button onClick={() => handleDelete(index)}>Delete</button>
//             // </li>
//             <TodoComp
//               item={item}
//               index={index}
//               key={index}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//               isEditing={editIndex === index}
//             />
//           ))}
//         </ul>
//       ) : (
//         <p>No fruits added yet</p>
//       )}
//     </div>
//   );
// }






// import { Button } from "@mui/material"; // Importing MUI button for styled buttons
// import React, { useEffect, useState } from "react";
// import { v4 as uuidv4 } from "uuid"; // UUID generator to assign unique IDs

// // Main Todo component
// export const Todo = () => {
//   // Load todo list from localStorage on initial render
//   const loadTodos = () => {
//     const stored = localStorage.getItem("myTodo");
//     return stored ? JSON.parse(stored) : []; // If stored data exists, parse it; otherwise, return an empty array
//   };

//   // React state variables
//   const [inputValue, setInputValue] = useState(""); // Tracks input field value
//   const [error, setError] = useState(""); // Tracks validation error
//   const [todoEditId, setTodoEditId] = useState(null); // Stores the ID of the todo being edited
//   const [todoList, setTodoList] = useState(loadTodos); // Stores the full list of todos
//   const [loading, setLoading] = useState(false); // Shows loading feedback when adding/updating

//   // Update localStorage whenever todoList changes
//   useEffect(() => {
//     localStorage.setItem("myTodo", JSON.stringify(todoList));
//   }, [todoList]);

//   // Handles add or update button click
//   const handleClick = () => {
//     // If input is empty, show error and stop
//     if (inputValue.trim() === "") {
//       setError("Required");
//       return;
//     }

//     setError(""); // Clear any existing error
//     setLoading(true); // Start loading state

//     // Simulate delay (e.g., for API call)
//     setTimeout(() => {
//       if (todoEditId) {
//         // Editing existing todo
//         const updatedList = todoList.map((todo) =>
//           todo.id === todoEditId ? { ...todo, text: inputValue } : todo
//         );
//         setTodoList(updatedList);
//         setTodoEditId(null); // Exit edit mode
//       } else {
//         // Adding new todo
//         const newTodo = { id: uuidv4(), text: inputValue }; // Create new todo with unique ID
//         setTodoList([...todoList, newTodo]); // Add to existing list
//       }

//       setInputValue(""); // Clear input field
//       setLoading(false); // Stop loading
//     }, 300); // Delay of 300ms
//   };

//   // Handles pressing "Enter" in the input field
//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") handleClick();
//   };

//   // Delete a todo by its ID
//   const handleDelete = (idToDelete) => {
//     const filtered = todoList.filter((item) => item.id !== idToDelete);
//     setTodoList(filtered);
//   };

//   // Load a todo into input field for editing
//   const handleEdit = (idToEdit) => {
//     const todoItem = todoList.find((item) => item.id === idToEdit);
//     if (todoItem) {
//       setInputValue(todoItem.text); // Set text into input field
//       setTodoEditId(idToEdit); // Set the ID so we know we're editing
//     }
//   };

//   return (
//     <div>
//       <h2>📝 My Todo List (UUID Version)</h2>

//       {/* Input field for new/edit task */}
//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         onKeyDown={handleKeyDown}
//         placeholder="Enter task..."
//       />

//       {/* Add/Update button */}
//       <Button onClick={handleClick} disabled={loading}>
//         {todoEditId ? "Update" : "Add Todo"}
//       </Button>

//       {/* Show validation error if any */}
//       {error && <p style={{ color: "red" }}>{error}</p>}

//       {/* Show loading indicator */}
//       {loading && <p>Loading...</p>}

//       {/* List of todos */}
//       <ul>
//         {todoList.map((item) => (
//           <li key={item.id}>
//             {item.text}
//             {/* Edit button for each item */}
//             <Button onClick={() => handleEdit(item.id)}>Edit</Button>

//             {/* Delete button for each item */}
//             <Button onClick={() => handleDelete(item.id)} color="error">
//               Delete
//             </Button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };
