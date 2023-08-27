import React, { useState, useEffect } from "react";
import axios from "axios";
import { CustomButton } from "../components/CustomButton";
import { Card, CardContent, Select, MenuItem } from "@mui/material";
import { StatusEnum } from "./utils"; // Make sure you import the correct path

export const FeedbackPage = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);

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
    } catch (error) {
      console.error("Error submitting feedback:", error);
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
      }}
    >
      <h1>Course Details</h1>
      <Card
        style={{
          marginBottom: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <CardContent>
          <label style={{ marginBottom: "10px" }}>Select a course:</label>
          <Select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <MenuItem value="">Select a course</MenuItem>
            {courses.map((course) => (
              <MenuItem key={course.course_id} value={course.course_id}>
                {course.course_name}
              </MenuItem>
            ))}
          </Select>
        </CardContent>
      </Card>
      {questions.length > 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {questions.map((question, index) => (
            <Card
              key={question.question_id}
              style={{
                marginBottom: "20px",
                fontSize: "18px",
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#f7f7f7",
              }}
            >
              <CardContent>
                {question.question}
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
              </CardContent>
            </Card>
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
        </div>
      )}
    </div>
  );
};
