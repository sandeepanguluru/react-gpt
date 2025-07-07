import { Button, TextField } from "@mui/material";
import { green } from "@mui/material/colors";
import React, { useEffect, useState } from "react";
const ColorPicker = ({ onDecrease, onIncrease, count,color, reset,step,setStepChange }) => {
  
  //   const [color,setColor]=useState("black");
  // useEffect(()=>{
  //   if(count > 0){
  //     setColor("green")
  //   }else if(count <0){
  //     setColor("red")
  //   }else if(count === 0){
  //     setColor("black")
  //   }
  // },[count])

  return (
    // <>
    //   <button onClick={()=>{onColorChange("red")}}>Red</button>
    //   <button onClick={()=>{onColorChange("blue")}}>Blue</button>
    //   <button onClick={()=>{onColorChange("green")}}>Green</button>
    // </>

    // <>
    // <h1 style={{color:color}}>{count}</h1>
    // <Button onClick={onIncrease}>Increament</Button>
    // <Button onClick={onDecrease}>Decreament</Button>
    // <Button onClick={reset}>Reset</Button>
    // </>
    <>
    <h1 style={{color:color}}>  {step}</h1>
      <TextField
        type="number"
        value={step}
        onChange={(e) => setStepChange(e.target.value)}
        label="step"
      />
      <Button onClick={onIncrease}>Increament</Button>
      <Button onClick={onDecrease}>Decreament</Button>
      <Button onClick={reset}>Reset</Button>
    </>
  );
};
export default ColorPicker;
