import {
  Alert,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const UserForm = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cnfPassword, setCnfPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [role,setRole]=useState("admin")
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);

  // ✅ Load saved data when app starts
  useEffect(() => {
    const data = localStorage.getItem("saveData");
    if (data) {
      try {
        const parsed = JSON.parse(data);
        if (typeof parsed.userName === "string") setUserName(parsed.userName);
        if (typeof parsed.email === "string") setEmail(parsed.email);
        if (typeof parsed.password === "string") setPassword(parsed.password);
        if (typeof parsed.cnfPassword === "string")
          setCnfPassword(parsed.cnfPassword);
        if (typeof parsed.role === "string")setRole(parsed.role)
      } catch (err) {
        console.error("Invalid saved data:", err);
      }
    }
  }, []);

  // ✅ Save data on change
  useEffect(() => {
    const dataToSave = { userName, email, password, cnfPassword,role };
    localStorage.setItem("saveData", JSON.stringify(dataToSave));
  }, [userName, email, password, cnfPassword,role]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!userName.trim()) newErrors.userName = "Username is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";
    if (!cnfPassword.trim())
      newErrors.cnfPassword = "Confirm Password is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

    if (email && !emailRegex.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (password && !passwordRegex.test(password)) {
      newErrors.password =
        "Password must be at least 6 characters, include 1 letter and 1 number";
    }

    if (password && cnfPassword && cnfPassword !== password) {
      newErrors.cnfPassword = "Passwords do not match";
    }

    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccess(true);
      console.log({ userName, email, password });
    } else {
      setSuccess(false);
    }
  };
  const handleClear = () => {
    setUserName("");
    setCnfPassword("");
    setEmail("");
    setPassword("");
    localStorage.removeItem("saveData")
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom>
        User Form
      </Typography>

      <form onSubmit={handleSubmit} noValidate>
        <FormControl fullWidth>
          <InputLabel>User Role</InputLabel>
          <Select value={role} onChange={(e)=>setRole(e.target.value)} label="role">
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="superadmin">SuperAdmin</MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          margin="normal"
          label="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          error={Boolean(error.userName)}
          helperText={error.userName}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={Boolean(error.email)}
          helperText={error.email}
        />

        <TextField
          fullWidth
          margin="normal"
          label="Password"
          type={visible ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

        <TextField
          fullWidth
          margin="normal"
          label="Confirm Password"
          type={visible ? "text" : "password"}
          value={cnfPassword}
          onChange={(e) => setCnfPassword(e.target.value)}
          error={Boolean(error.cnfPassword)}
          helperText={error.cnfPassword}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setVisible(!visible)} edge="end">
                  {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          sx={{ mt: 2 }}
        >
          Submit
        </Button>
      </form>
      <Button
        variant="outlined"
        color="secondary"
        sx={{ mt: 2 }}
        onClick={handleClear}
      >
        Clear
      </Button>
      <Link to="/">Login</Link>

      {success && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Sign in Success!
        </Alert>
      )}
    </div>
  );
};

export default UserForm;
