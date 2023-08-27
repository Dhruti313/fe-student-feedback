// Button.js
import React from "react";

export const CustomButton = ({ onClick, children, disabled, style }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "10px 20px",
        marginTop: "20px",
        backgroundColor: disabled ? "#ccc" : "#007bff",
        color: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        width: "100%",
        ...style,
      }}
    >
      {children}
    </button>
  );
};
