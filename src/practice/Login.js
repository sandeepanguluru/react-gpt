import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState({});
  const [visible, setVisible] = useState(false);

  const { email, password } = data;
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if (email && !emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (password && !passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 6 characters, include a letter and a number";
    }

    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Optionally match with localStorage user
      const storedData = JSON.parse(localStorage.getItem("saveData")) || {};
      if (storedData.email === email && storedData.password === password) {
        toast.success("Login Successfull");
        const userRole = storedData.role || "admin";

        setTimeout(() => {
          if (userRole === "admin") {
            navigate("/dark");
          } else {
            navigate("userForm");
          }
        }, 3000);
      } else {
        toast.error("Invalid Credentials");
      }
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 400 }}>
      <Typography variant="h4">Login</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Email"
          name="email"
          value={email}
          onChange={handleChange}
          error={Boolean(error.email)}
          helperText={error.email}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Password"
          name="password"
          type={visible ? "text" : "password"}
          value={password}
          onChange={handleChange}
          error={Boolean(error.password)}
          helperText={error.password}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setVisible(!visible)} edge="end">
                  {visible ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
          Login
        </Button>
      </form>

      <Typography sx={{ mt: 2 }}>
        Don't have an account? <Link to="/userForm">Register</Link>
      </Typography>
    </div>
  );
};

export default Login;
