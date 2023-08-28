import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Navbar from "../Navbar"; // Import the Navbar component

const StatusEnum = {
  null: { label: "null" },
  1: { label: "Poor" },
  2: { label: "Good" },
  3: { label: "Satisfactory" },
  4: { label: "Excellent" },
};

const Label = ({ children }) => (
  <Typography variant="subtitle1" style={{ marginBottom: "5px" }}>
    {children}
  </Typography>
);

const FeedbackStatus = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [averageStatus, setAverageStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/course-details"
        );
        setCourses(response.data);
      } catch (error) {
        setError("Error fetching courses");
      }
    };

    fetchCourses();
  }, []);

  const handleCalculateAverage = async () => {
    if (!selectedCourse || !startTime || !endTime) {
      setError("Please select a course, start date, and end date.");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8080/feedback-status?courseId=${selectedCourse}&startTime=${startTime.getTime()}&endTime=${endTime.getTime()}`
      );
      setAverageStatus(response.data.averageStatus);
      setError(null);
    } catch (error) {
      setError("Error calculating average status");
    }
  };

  return (
    <>
      <Card
        elevation={3}
        style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}
      >
        <CardContent>
          <CardHeader title="Feedback Status" />
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Select a Course</InputLabel>
                <Select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  label="Select a Course"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {courses.map((course) => (
                    <MenuItem key={course.course_id} value={course.course_id}>
                      {course.course_name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Label>Start Date:</Label>
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                dateFormat="yyyy-MM-dd"
                className="date-picker"
                style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Label>End Date:</Label>
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                dateFormat="yyyy-MM-dd"
                className="date-picker"
                style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
              />
            </Grid>
          </Grid>
          {error && <Typography color="error">{error}</Typography>}
          {averageStatus !== null && (
            <Typography variant="h6">
              Average Status: {StatusEnum[averageStatus.toPrecision(1)]?.label}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            onClick={handleCalculateAverage}
            style={{ marginTop: "10px" }}
          >
            Calculate Average Status
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default FeedbackStatus;
