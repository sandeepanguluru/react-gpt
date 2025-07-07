import { Button } from "@mui/material";
import React from "react";
const TodoComp = (props) => {
  const { item, index, onEdit, onDelete, isEditing } = props;
  console.log("TodoItem props:", props);
  return (
    <>
      <li>
        {item}
        {isEditing && <strong style={{ color: "orange" }}>(Editing...)</strong>}

        <Button
          onClick={() => {
            onEdit(index);
          }}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            onDelete(index);
          }}
        >
          Delete
        </Button>
      </li>
    </>
  );
};
export default TodoComp;
