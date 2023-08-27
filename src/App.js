import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginPage } from "./Autorization/LoginPage";
import { FeedbackPage } from "./FeedbackPage";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route  path="/login" element={<LoginPage />} />
        <Route path="/feedback" element={<FeedbackPage />} />
      </Routes>
    </Router>
  );
};

export default App;
