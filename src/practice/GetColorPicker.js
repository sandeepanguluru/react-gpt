import React, { useEffect, useState } from "react";
import ColorPicker from "./Colorpicker";
const GetColorPicker = () => {
  const [bgcolor, setBgcolor] = useState("");
  const [count, setCount] = useState(0);
  const [positive, setPositive] = useState("");
  const handleChange = (color) => {
    setBgcolor(color);
  };
  useEffect(() => {
    // if(count > 0){
    //   setPositive("green")
    // }else if(count < 0){
    //   setPositive ("red")
    // }else if(count === 0){
    //   setPositive("black")
    // }

    let color = count > 0 ? "green" : count < 0 ? "red" : "black";
    setPositive(color);

    // {count > 0 ? setPositive("green") : count < 0 ? setPositive("red"):count === 0 ? setPositive("black")}
  }, [count]);
  const handleIncrease = () => {
    setCount((prev) => prev + 1);
  };
  const handleDecrease = () => {
    setCount((prev) => prev - 1);
  };
  const handleReset = () => {
    setCount(0);
  };
  return (
    <>
      <div style={{ backgroundColor: bgcolor, height: "100vh" }}>
        {/* <ColorPicker onColorChange={handleChange} /> */}
        {/* <ColorPicker count={count} reset={handleReset} onIncrease={handleIncrease} onDecrease={handleDecrease}/> */}
        <ColorPicker
          color={positive}
          step={count}
          setStepChange={(count) => setCount(count)}
          reset={handleReset}
          onIncrease={handleIncrease}
          onDecrease={handleDecrease}
          disabled={count === 0}
        />
      </div>
    </>
  );
};
export default GetColorPicker;
