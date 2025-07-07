import React from "react";
import { Button } from "@mui/material";

// Child component that sends input value to parent
export const ChildToParent = ({ sendMessageToParent, inputValue, setInputValue }) => {

  // Triggered when button is clicked
  const handleSend = () => {
    sendMessageToParent(inputValue); // Call parent function with current input value
  };

  // Triggered when user presses a key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessageToParent(inputValue); // Same action on Enter key
    }
  };

  return (
    <>
      {/* Controlled input: value and onChange come from parent */}
      <input
        type="text"
        placeholder="Type a message"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)} // Update parent's state
        onKeyDown={handleKeyDown}
      />

      {/* Button triggers send function */}
      <Button onClick={handleSend}>
        {inputValue.trim() === "" ? "Add" : "Save"}
      </Button>
    </>
  );
};
