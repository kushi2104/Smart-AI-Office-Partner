import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { supabase } from "../supabaseClient"; // ✅ check path!

const Signup = ({ onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollOrSpec, setRollOrSpec] = useState(""); // roll_no or specialization
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");

const handleSignup = async () => {
  if (!name || !email || !password) {
    alert("Please fill all required fields!");
    return;
  }

  try {
    // Step 1: Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error("User creation failed");

    const authId = authData.user.id; // ✅ Supabase Auth UUID

    // Step 2: Insert into "users" table
    const { data: userRow, error: userInsertError } = await supabase
      .from("users")
      .insert([
        {
          auth_id: authId,  // ✅ store Supabase Auth UUID here
          email,
          role,
        },
      ])
      .select()
      .single();

    if (userInsertError) throw userInsertError;

    // Step 3: Insert into students or teachers
    if (role === "student") {
      const { error: studentError } = await supabase.from("students").insert([
        {
          user_id: userRow.id,   // ✅ link to users.id (PK)
          name,
          roll_no: rollOrSpec,
          year: year ? parseInt(year) : null,
          semester: semester ? parseInt(semester) : null,
          section: section || null,
        },
      ]);
      if (studentError) throw studentError;
    } else {
      const { error: teacherError } = await supabase.from("teachers").insert([
        {
          user_id: userRow.id,   // ✅ link to users.id (PK)
          name,
          specialization: rollOrSpec,
        },
      ]);
      if (teacherError) throw teacherError;
    }

    alert("✅ Account created successfully!");
    onSwitchToLogin();
  } catch (err) {
    alert("Sign Up Error: " + err.message);
  }
};


  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #43e97b, #38f9d7)",
        p: 2,
      }}
    >
      <Paper elevation={12} sx={{ p: 4, borderRadius: 3, width: 400 }}>
        <Typography
          variant="h4"
          sx={{ mb: 3, fontWeight: "bold", textAlign: "center", color: "#333" }}
        >
          Create Account
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Full Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label={role === "student" ? "USN / Roll No" : "Specialization"}
            variant="outlined"
            value={rollOrSpec}
            onChange={(e) => setRollOrSpec(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {role === "student" && (
            <>
              <TextField
                label="Year (1-4)"
                type="number"
                variant="outlined"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
              <TextField
                label="Semester (1-8)"
                type="number"
                variant="outlined"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              />
              <TextField
                label="Section (optional)"
                variant="outlined"
                value={section}
                onChange={(e) => setSection(e.target.value)}
              />
            </>
          )}

          <FormControl component="fieldset">
            <FormLabel component="legend">Select Role</FormLabel>
            <RadioGroup
              row
              value={role}
              onChange={(e) => setRole(e.target.value)}
              sx={{ mt: 1 }}
            >
              <FormControlLabel
                value="student"
                control={<Radio />}
                label="Student"
              />
              <FormControlLabel
                value="teacher"
                control={<Radio />}
                label="Teacher"
              />
            </RadioGroup>
          </FormControl>

          <Button
            variant="contained"
            sx={{
              background: "linear-gradient(to right, #43e97b, #38f9d7)",
              color: "#fff",
              fontWeight: "bold",
              py: 1.2,
            }}
            onClick={handleSignup}
          >
            Sign Up
          </Button>

          <Button variant="text" onClick={onSwitchToLogin}>
            Already have an account? Login
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Signup;
