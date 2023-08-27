import React from "react";
export const InputField = ({ type, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        padding: "10px",
        margin: "5px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        width: "200px",
      }}
    />
  );
};
