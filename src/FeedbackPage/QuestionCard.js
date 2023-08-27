import React, { useState } from "react";
import { CustomButton } from "../components/CustomButton";
// Define an enum for status values and labels
const StatusEnum = {
  POOR: { value: "0", label: "Poor" },
  GOOD: { value: "1", label: "Good" },
  SATISFACTORY: { value: "2", label: "Satisfactory" },
  EXCELLENT: { value: "3", label: "Excellent" },
};

// ... (other imports and code)

export const QuestionCard = ({ question }) => {
  const [selectedStatus, setSelectedStatus] = useState(null);

  return (
    <div
      style={{
        marginBottom: "20px",
        fontSize: "18px",
        textAlign: "center",
      }}
    >
      {question.question}
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          gap: "10px",
        }}
      >
        {Object.values(StatusEnum).map((statusObj) => (
          <CustomButton
            key={statusObj.value}
            style={{
              backgroundColor:
                selectedStatus === statusObj.value ? "#007bff" : "#ccc",
              color: "white",
            }}
            onClick={() => setSelectedStatus(statusObj.value)}
          >
            {statusObj.label}
          </CustomButton>
        ))}
      </div>
    </div>
  );
};
