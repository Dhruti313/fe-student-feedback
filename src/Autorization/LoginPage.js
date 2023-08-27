import React, { useState } from "react";
import { InputField } from "../components/InputField";
import { roleOptions } from "./utils";
import { DropdownInput } from "../components/DropdownInput";
import { CustomButton } from "../components/CustomButton";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(roleOptions[0].value);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fetchLoginData = async (username, password, userType) => {
    try {
      const response = await axios.get("http://localhost:8080/user/login", {
        params: {
          username,
          password,
          usertype: userType,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const handleLogin = async () => {
    try {
      const data = await fetchLoginData(username, password, role);
      setResponseData(data);
      setError(null);

      if (data.status === "success") {
        if (responseData.user_type === roleOptions[0].value) {
          navigate("/feedback");
        } else {
          navigate("/feedbackStatus");
        }

        console.log("Login successful as", data.user_type);
      } else if (data.status === "failed") {
        setError(`Login failed for ${data.user_type}`);
      }
    } catch (error) {
      setError("Login failed. Please check your credentials."); // Set error message
      console.error("Login error:", error);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100dvh",
        backgroundColor: "#f0f0f0", // Set the background color
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "20px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          borderRadius: "10px",
          backgroundColor: "white",
          boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)", // Add a subtle shadow
        }}
      >
        <h1>Login</h1>
        <div
          style={{
            width: "60%",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <DropdownInput
            options={roleOptions}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <InputField
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <CustomButton onClick={handleLogin} disabled={!username || !password}>
            Submit
          </CustomButton>

          {responseData && responseData.status === "success" && (
            <p style={{ color: "green", marginTop: "10px" }}>
              Login successful as {responseData.user_type}
            </p>
          )}
          {responseData && responseData.status === "failed" && (
            <p style={{ color: "red", marginTop: "10px" }}>
              Login failed for {responseData.user_type}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
