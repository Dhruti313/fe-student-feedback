import React from "react";
import TextField from "@mui/material/TextField";

export const InputField = ({ type, placeholder, value, onChange }) => {
  return (
    <TextField
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      variant="outlined"
      style={{
        padding: "10px",
        margin: "5px",
        borderRadius: "5px",
        width: "210px",
      }}
    />
  );
};

export default InputField;
