import React from "react";
import Button from "@mui/material/Button";

export const CustomButton = ({ onClick, children, disabled, style }) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      variant="contained"
      style={{
        marginTop: "20px",
        backgroundColor: disabled ? "#ccc" : "#007bff",
        color: "white",
        borderRadius: "5px",
        cursor: "pointer",
        width: "100%",
        ...style,
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
