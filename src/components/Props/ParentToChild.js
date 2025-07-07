// import React, { useEffect, useState } from "react";
// import { ChildToParent } from "./ChildToParent";
// import { Button } from "@mui/material";

// export const ParentToChild = () => {
//   const getFromStorage = () => {
//     const data = localStorage.getItem("childMessage");
//     return data ? JSON.parse(data) : [];
//   };

//   const [messages, setMessages] = useState(getFromStorage);
//   const [inputValue, setInputValue] = useState("");
//   const [editIndex, setEditIndex] = useState(null);

//   useEffect(() => {
//     localStorage.setItem("childMessage", JSON.stringify(messages));
//   }, [messages]);

//   const handleMessage = (msg) => {
//     if (msg.trim() === "") return;

//     if (editIndex !== null) {
//       const updated = [...messages];
//       updated[editIndex] = msg;
//       setMessages(updated);
//       setEditIndex(null);
//     } else {
//       setMessages([...messages, msg]);
//     }

//     setInputValue(""); // clear input after add/update
//   };

//   const handleDelete = (indexToDelete) => {
//     const filtered = messages.filter((_, index) => index !== indexToDelete);
//     setMessages(filtered);
//     if (editIndex === indexToDelete) setEditIndex(null);
//   };

//   const handleEdit = (indexToEdit) => {
//     setInputValue(messages[indexToEdit]);
//     setEditIndex(indexToEdit);
//   };

//   const handleReset = () => {
//     setMessages([]);
//     setInputValue("");
//     setEditIndex(null);
//   };

//   return (
//     <>
//       <h2>📨 Messages from Child</h2>

//       <ChildToParent
//         sendMessageToParent={handleMessage}
//         inputValue={inputValue}
//         setInputValue={setInputValue}
//       />

//       <Button onClick={handleReset} color="warning" variant="outlined">
//         Reset All
//       </Button>

//       <ul>
//         {messages.map((item, index) => (
//           <li key={index}>
//             {item}
//             <Button onClick={() => handleEdit(index)}>Edit</Button>
//             <Button onClick={() => handleDelete(index)} color="error">
//               Delete
//             </Button>
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// };




import React, { useEffect, useState } from "react";
import { ChildToParent } from "./ChildToParent";
import {
  Box,
  Button,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Snackbar,
  Alert,
  Stack
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export const ParentToChild = () => {
  const getFromStorage = () => {
    const data = localStorage.getItem("childMessage");
    return data ? JSON.parse(data) : [];
  };

  const [messages, setMessages] = useState(getFromStorage);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const [toast, setToast] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    localStorage.setItem("childMessage", JSON.stringify(messages));
  }, [messages]);

  const showToast = (message, severity = "success") => {
    setToast({ open: true, message, severity });
  };

  const handleMessage = (msg) => {
    if (msg.trim() === "") return;

    if (editIndex !== null) {
      const updated = [...messages];
      updated[editIndex] = msg;
      setMessages(updated);
      setEditIndex(null);
      showToast("Message updated!");
    } else {
      setMessages([...messages, msg]);
      showToast("Message added!");
    }

    setInputValue("");
  };

  const handleDelete = (indexToDelete) => {
    const filtered = messages.filter((_, index) => index !== indexToDelete);
    setMessages(filtered);
    if (editIndex === indexToDelete) setEditIndex(null);
    showToast("Message deleted!", "warning");
  };

  const handleEdit = (indexToEdit) => {
    setInputValue(messages[indexToEdit]);
    setEditIndex(indexToEdit);
  };

  const handleReset = () => {
    setMessages([]);
    setInputValue("");
    setEditIndex(null);
    showToast("All messages cleared", "info");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom align="center">
        📨 Messages from Child
      </Typography>

      <ChildToParent
        sendMessageToParent={handleMessage}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />

      <Stack direction="row" justifyContent="flex-end" mt={2} mb={2}>
        <Button onClick={handleReset} color="warning" variant="outlined">
          Reset All
        </Button>
      </Stack>

      <List>
        {messages.map((item, index) => (
          <ListItem
            key={index}
            secondaryAction={
              <Box>
                <IconButton edge="end" onClick={() => handleEdit(index)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" color="error" onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            }
          >
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>

      {/* Snackbar (Toast Notification) */}
      <Snackbar
        open={toast.open}
        autoHideDuration={2000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={toast.severity} onClose={() => setToast({ ...toast, open: false })}>
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};
