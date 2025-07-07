import React from "react";

const InputField = (props) => {
  const { name, value, onChange, type = "text", className, placeholder } = props;

  return (
    <>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={className}
        placeholder={placeholder}
      />
    </>
  );
};

export default InputField;
