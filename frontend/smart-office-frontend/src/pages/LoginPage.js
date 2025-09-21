import React, { useState } from "react";
import { TextField, Button, Typography, Box, Link, Paper } from "@mui/material";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

const Login = ({ onSwitchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  if (!email || !password) {
    alert("Please fill all fields!");
    return;
  }

  try {
    console.log("Attempting login with:", { email, password });

    // Step 1: Supabase Auth login
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      console.log("Supabase Auth Error:", authError);
      alert("Invalid credentials (Supabase Auth)");
      return;
    }

    console.log("Supabase Auth Data:", authData);

    const authId = authData.user.id;
    console.log("Supabase User ID (authId):", authId);

    // Step 2: Users table lookup
    const { data: userRow, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("auth_id", authId)
      .single();

    if (userError) {
      console.log("User table lookup error:", userError);
      alert("No matching user profile found.");
      return;
    }

    if (!userRow) {
      console.log("No user row found for authId:", authId);
      alert("No matching user profile found.");
      return;
    }

    console.log("User row:", userRow);

    // Step 3: Profile lookup based on role
    if (userRow.role === "student") {
      const { data: studentProfile, error: studentError } = await supabase
        .from("students")
        .select("*")
        .eq("user_id", userRow.id)
        .single();

      if (studentError || !studentProfile) {
        console.log("Student profile error:", studentError);
        alert("Student profile not found.");
        return;
      }

      console.log("Student profile:", studentProfile);
      alert(`Welcome ${studentProfile.name} (Student)`);
      navigate("/student");

    } else if (userRow.role === "teacher") {
      const { data: teacherProfile, error: teacherError } = await supabase
        .from("teachers")
        .select("*")
        .eq("user_id", userRow.id)
        .single();

      if (teacherError || !teacherProfile) {
        console.log("Teacher profile error:", teacherError);
        alert("Teacher profile not found.");
        return;
      }

      console.log("Teacher profile:", teacherProfile);
      alert(`Welcome ${teacherProfile.name} (Teacher)`);
      navigate("/teacher");

    } else {
      console.log("Unknown role:", userRow.role);
      alert("Role not recognized.");
    }

  } catch (err) {
    console.log("Unexpected Login Error:", err);
    alert("Login Error: " + err.message);
  }
};



  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #4facfe, #00f2fe)",
        p: 2,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          p: 4,
          borderRadius: 3,
          width: 350,
          textAlign: "center",
          backgroundColor: "#ffffffdd",
        }}
      >
        <Typography
          variant="h4"
          sx={{ mb: 3, fontWeight: "bold", color: "#333" }}
        >
          AIML Department
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(to right, #4facfe, #00f2fe)",
              color: "#fff",
              fontWeight: "bold",
              py: 1.2,
              mt: 1,
            }}
            onClick={handleLogin}
          >
            Login
          </Button>

          <Link
          component="button"
          variant="body2"
          onClick={onSwitchToSignup}
          sx={{ mt: 1 }}
>
           Create Account
         </Link>
 
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
