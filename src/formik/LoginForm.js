import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

const LoginForm = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const getSavedValues = () => {
    const UserData = localStorage.getItem("loginValues");
    return UserData
      ? JSON.parse(UserData)
      : {
          name: "",
          phone: "",
          email: "",
          password: "",
          cnfpsw: "",
          rememberMe: false,
        };
  };
  

  const formik = useFormik({
    initialValues: getSavedValues(),
    validationSchema: Yup.object({
      name: Yup.string().trim().required("User Name is required"),
      phone: Yup.string()
        .trim()
        .matches(/^[0-9]{10}$/, "Phone must be exactly 10 digits")
        .required("Phone is required"),
      email: Yup.string()
        .trim()
        .email("Invalid email")
        .required("Email is required"),
      password: Yup.string()
        .trim()
        .min(6, "Min 6 letters only")
        .required("Password is required"),
      cnfpsw: Yup.string()
        .trim()
        .required("Confirm password is required")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/posts",
          {
            email: values.email,
            password: values.password,
          }
        );

        console.log("✅ Registered Successfully:", response.data);
        alert("User registered! Mock ID: " + response.data.id);

        const existingUsers = JSON.parse(localStorage.getItem("userData"));
        const updatedUsers = Array.isArray(existingUsers)
          ? [...existingUsers, values]
          : [values]; // if no users exist or it's not an array
        localStorage.setItem("userData", JSON.stringify(updatedUsers));
        resetForm();
        navigate("/dashboard");
      } catch (error) {
        console.error("❌ Registration failed:", error);
        alert("Error: Registration failed");
      }
    },
  });
  useEffect(() => {
    localStorage.setItem("loginValues", JSON.stringify(formik.values));
  }, [formik.values]);

  return (
    <Grid
      container
      direction="column"
      spacing={2}
      style={{ maxWidth: 400, margin: "auto" }}
    >
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="User Name"
          name="name"
          type="text"
          fullWidth
          margin="normal"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          label="Phone"
          name="phone"
          type="text"
          fullWidth
          margin="normal"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
        />

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          label="Password"
          fullWidth
          margin="normal"
          type={visible ? "text" : "password"}
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
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
          label="Confirm Password"
          fullWidth
          margin="normal"
          type={visible ? "text" : "password"}
          name="cnfpsw"
          value={formik.values.cnfpsw}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.cnfpsw && Boolean(formik.errors.cnfpsw)}
          helperText={formik.touched.cnfpsw && formik.errors.cnfpsw}
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

        <FormControlLabel
          control={
            <Checkbox
              name="rememberMe"
              checked={formik.values.rememberMe}
              onChange={formik.handleChange}
            />
          }
          label="Remember Me"
        />

        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
    </Grid>
  );
};

export default LoginForm;
