// DropdownInput.js
import React from "react";

export const DropdownInput = ({ options, value, onChange }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      style={{
        padding: "10px",
        margin: "5px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        width: "220px",
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
