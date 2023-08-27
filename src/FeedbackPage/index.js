import React, { useState, useEffect } from "react";
import axios from "axios";
import { CustomButton } from "../components/CustomButton";
import { Select, MenuItem, Typography, Card } from "@mui/material";
import { StatusEnum } from "./utils";
import { useNavigate } from "react-router-dom";

export const FeedbackPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/course-details"
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const fetchQuestions = async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/getquestions?course_id=${courseId}`
      );
      setQuestions(response.data);
      setSelectedStatuses(response.data.map(() => StatusEnum.GOOD.value)); // Initialize statuses
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  useEffect(() => {
    if (selectedCourse) {
      fetchQuestions(selectedCourse);
    }
  }, [selectedCourse]);

  const handleStatusChange = (index, newStatus) => {
    setSelectedStatuses((prevStatuses) => {
      const updatedStatuses = [...prevStatuses];
      updatedStatuses[index] = newStatus;
      return updatedStatuses;
    });
  };

  const handleFeedbackSubmit = async () => {
    // Check if all questions have been answered
    if (selectedStatuses.includes(undefined)) {
      alert("Please answer all questions before submitting feedback.");
      return;
    }

    // Prepare the feedback data and send it to the server
    const feedbackData = {
      course_id: selectedCourse,
      response: questions.map((question, index) => ({
        question_id: question.question_id,
        status: selectedStatuses[index],
      })),
    };

    try {
      await axios.post("http://localhost:8080/student_feedback", feedbackData);
      alert("Feedback submitted successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      navigate("/login");
      alert("An error occurred while submitting feedback.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        background: "#f0f0f0",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          padding: "20px",
          background: "#ffffff",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h4">Course Details</Typography>
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="body1" style={{ marginBottom: "10px" }}>
            Select a course:
          </Typography>
          <Select
            value={selectedCourse}
            style={{ width: 200 }}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <MenuItem value="">Select a course</MenuItem>
            {courses.map((course) => (
              <MenuItem key={course.course_id} value={course.course_id}>
                {course.course_name}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
      {questions.length > 0 && (
        <Card
          style={{
            padding: "20px",
            width: "80%",
            maxWidth: "800px",
            marginTop: "100px",
          }}
        >
          {questions.map((question, index) => (
            <div
              key={question.question_id}
              style={{
                marginBottom: "20px",
                fontSize: "18px",
                textAlign: "center",
              }}
            >
              <Typography variant="h6">{question.question}</Typography>
              <div
                style={{
                  marginTop: "10px",
                  display: "flex",
                  gap: "10px",
                }}
              >
                {Object.values(StatusEnum).map((status) => (
                  <CustomButton
                    key={status.value}
                    style={{
                      padding: "10px 20px",
                      fontSize: "16px",
                      borderRadius: "5px",
                      backgroundColor:
                        selectedStatuses[index] === status.value
                          ? "#007bff"
                          : "#ccc",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                    onClick={() => handleStatusChange(index, status.value)}
                    disabled={selectedStatuses[index] === status.value}
                  >
                    {status.label}
                  </CustomButton>
                ))}
              </div>
            </div>
          ))}
          <CustomButton
            onClick={handleFeedbackSubmit}
            style={{
              padding: "10px 20px",
              fontSize: "18px",
              borderRadius: "5px",
              backgroundColor: "#28a745",
              color: "#fff",
              cursor: "pointer",
            }}
            disabled={selectedStatuses.includes(undefined)}
          >
            Submit Feedback
          </CustomButton>
        </Card>
      )}
    </div>
  );
};
