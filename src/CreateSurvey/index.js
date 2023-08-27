import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const CreateSurvey = () => {
  const [courseName, setCourseName] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8080/course-details");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim() !== "") {
      setQuestions([...questions, newQuestion]);
      setNewQuestion("");
    }
  };

  const handleCreateSurvey = async () => {
    if (questions.length === 0) {
      alert("Please add at least one question.");
      return;
    }

    const surveyData = {
      question: questions,
      startTime: Date.parse(startTime),
      endTime: Date.parse(endTime),
      courseInfo: courseName.course_id,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/questions",
        surveyData
      );

      const feedbackData = {
        course_id: response.data.courseInfo.course_id,
        response: response.data.question.map((_, index) => ({
          question_id: index + 1,
          status: "4",
        })),
      };

      await axios.post("http://localhost:8080/student_feedback", feedbackData);

      // Show success message
      alert("Survey created and feedback submitted successfully!");

      // Redirect to /login page
      window.location.href = "/login";
    } catch (error) {
      console.error("Error creating survey and submitting feedback:", error);
      alert(
        "An error occurred while creating the survey and submitting feedback."
      );
    }
  };

  return (
    <div className="container">
      <Card className="card">
        <CardContent>
          <Typography variant="h4">Create Survey</Typography>
          <FormControl fullWidth style={{ margin: "10px 0" }}>
            <InputLabel>Course Name</InputLabel>
            <Select
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            >
              {courses.map((course) => (
                <MenuItem key={course.course_id} value={course}>
                  {course.course_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <DatePicker
            selected={startTime}
            onChange={(date) => setStartTime(date)}
            dateFormat="MMMM d, yyyy"
            placeholderText="Start Time"
            className="form-control"
            style={{ margin: "10px 0", width: "100%" }}
          />
          <DatePicker
            selected={endTime}
            onChange={(date) => setEndTime(date)}
            dateFormat="MMMM d, yyyy"
            placeholderText="End Time"
            className="form-control"
            style={{ margin: "10px 0", width: "100%" }}
          />
          <div style={{ margin: "10px 0" }}>
            <Typography variant="h6">Questions:</Typography>
            {questions.map((q, index) => (
              <Typography key={index}>{q}</Typography>
            ))}
            <div style={{ display: "flex", marginTop: "10px" }}>
              <TextField
                label="New Question"
                fullWidth
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              <Button
                variant="outlined"
                style={{ marginLeft: "10px" }}
                onClick={handleAddQuestion}
              >
                Add Question
              </Button>
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateSurvey}
            disabled={questions.length === 0}
            style={{ marginTop: "20px" }}
          >
            Create Survey
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
