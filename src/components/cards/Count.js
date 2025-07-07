import { Button } from "@mui/material";
import React, { useState } from "react";
const Count = () => {
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount((prev)=>prev +1);
  };
  const handleReduce = () => {
    setCount(count - 1);
  };
  const handleClear = () => {
    setCount(0);
  };
  return (
    <>
      <div>
        <h2>Count :{count}</h2>
        <Button onClick={handleClick}>Add</Button>
        <Button onClick={handleReduce}>Reduce</Button>
        <Button onClick={handleClear}>Clear</Button>
      </div>
    </>
  );
};
export default Count;
