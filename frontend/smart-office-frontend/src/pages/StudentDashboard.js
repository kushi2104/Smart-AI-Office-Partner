import React from "react";
import {
  Box,
  Typography,
  Avatar,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Home, Notifications, Help, Person } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const StudentDashboard = () => {
  const [value, setValue] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { name } = location.state || { name: "Student" }; // Default if no state

  const menuItems = [
    { title: "Academic", icon: "🎓" },
    { title: "Pre-Exam", icon: "📚" },
    { title: "Attendance", icon: "📝" },
    { title: "During Exam", icon: "✅" },
    { title: "Results", icon: "📊" },
    { title: "Online Study Material", icon: "💻" },
    { title: "Documents", icon: "📄" },
    { title: "Uploads", icon: "📤" },
    { title: "Semester Registration", icon: "🗂️" },
  ];

  // Profile menu handlers
  const handleProfileClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleLogout = () => navigate("/");

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Top Banner */}
      <Box
        sx={{
          bgcolor: "green",
          color: "white",
          p: 3,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          position: "relative",
        }}
      >
        {/* Profile avatar top-right */}
        <IconButton
          onClick={handleProfileClick}
          sx={{ position: "absolute", top: 16, right: 16 }}
        >
          <Avatar sx={{ bgcolor: "white", color: "green", width: 48, height: 48 }}>
            {name.charAt(0)}
          </Avatar>
        </IconButton>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>

        <Typography variant="h6" fontWeight="bold">
          NMAM INSTITUTE OF TECHNOLOGY
        </Typography>
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          {name}
        </Typography>
        <Typography variant="body2">NNM22AM027</Typography>
      </Box>

      {/* Grid Menu */}
      <Grid container spacing={2} sx={{ p: 3 }}>
        {menuItems.map((item, index) => (
          <Grid item xs={4} key={index}>
            <Card sx={{ borderRadius: 3, textAlign: "center", boxShadow: 3 }}>
              <CardActionArea>
                <CardContent>
                  <Typography variant="h4">{item.icon}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    {item.title}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Bottom Navigation */}
      <Paper sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation value={value} onChange={(event, newValue) => setValue(newValue)} showLabels>
          <BottomNavigationAction label="Home" icon={<Home />} />
          <BottomNavigationAction label="Notifications" icon={<Notifications />} />
          <BottomNavigationAction label="Help" icon={<Help />} />
          <BottomNavigationAction label="Profile" icon={<Person />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default StudentDashboard;
