import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography } from "@mui/material";

const BaseForm = () => {
  // 1️⃣ Set up Formik
  const formik = useFormik({
    initialValues: {
      userName: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string().required("Username is required"),
    }),
    onSubmit: (values) => {
      alert(`Hello, ${values.userName}`);
    },
  });

  return (
    <div style={{ padding: "20px", maxWidth: "400px" }}>
      <Typography variant="h5" gutterBottom>
        Formik - One Field Example
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        {/* 2️⃣ Username Input */}
        <TextField
          fullWidth
          label="Username"
          name="userName"
          value={formik.values.userName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.userName && Boolean(formik.errors.userName)}
          helperText={formik.touched.userName && formik.errors.userName}
        />

        {/* 3️⃣ Submit Button */}
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default BaseForm;
