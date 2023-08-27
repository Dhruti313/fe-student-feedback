import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./Autorization/LoginPage";
import { FeedbackPage } from "./FeedbackPage";
import FeedbackStatus from "./FeedbackStatus";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
        <Route path="/feedbackStatus" element={<FeedbackStatus />} />
      </Routes>
    </Router>
  );
};

export default App;
