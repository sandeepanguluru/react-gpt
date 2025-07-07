import React, { useState } from "react";
import InputField from "../formInputs/InputField";

export const SampleForm = () => {
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const { userName, email, password } = userData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => { // Accept the event object
    e.preventDefault(); // Prevent default form submission

    // ✅ Simple validation
    if (!userName.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required");
      return;
    }

    // ✅ Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
      return;
    }

    // ✅ Clear error first, then alert
    setError("");
    alert(`User Info:\nName: ${userName}\nEmail: ${email}\nPassword: ${password}`);

    // ✅ Reset form
    setUserData({ userName: "", email: "", password: "" });
  };

  return (
    <>
      {/* Wrap with a form element */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="userName">UserName</label>
          <InputField
            type="text"
            name="userName"
            value={userName}
            onChange={handleChange}
            placeholder="Enter username"
          />
          <br />

          <label htmlFor="email">Email</label>
          <InputField
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter email"
          />
          <br />

          <label htmlFor="password">Password</label>
          <InputField
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter password"
          />
          <br />

          {/* Button can be type="submit" now */}
          <button type="submit">Submit</button>
        </div>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};