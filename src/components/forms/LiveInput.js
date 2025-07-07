import React, { useState } from "react";
export const LiveInput = () => {
  const [value, setValue] = useState("");
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <div>
        <input type="text" value={value} onChange={handleChange} />
        <h2>Value : {value}</h2>
      </div>
    </>
  );
};
