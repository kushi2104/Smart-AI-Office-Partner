import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";


function App() {
  const [showSignup, setShowSignup] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Login / Signup toggle */}
        <Route
          path="/"
          element={
            showSignup ? (
              <SignupPage onSwitchToLogin={() => setShowSignup(false)} />
            ) : (
              <LoginPage onSwitchToSignup={() => setShowSignup(true)} />
            )
          }
        />

        {/* Dashboard routes */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
      
      </Routes>
    </Router>
  );
}

export default App;
