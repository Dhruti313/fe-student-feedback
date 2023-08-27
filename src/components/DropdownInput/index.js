import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const DropdownInput = ({ options, value, onChange }) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      variant="outlined"
      style={{
        paddingLeft: "3px",
        paddingRight: "3px",
        margin: "5px",
        borderRadius: "5px",
        width: "220px",
      }}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
};

export default DropdownInput;
