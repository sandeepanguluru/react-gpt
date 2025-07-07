import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../practice/Login";
import UserForm from "../practice/UserForm";
import BaseForm from "../formik/BaseForm";
import Home from "../practice/Home";
import LoginForm from "../formik/LoginForm";
import Dashboard from "../dashboard/Dashboard";
const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/userForm" element={<UserForm />} />
      <Route path="/baseform" element={<BaseForm />} />
      <Route path="/loginForm" element={<LoginForm/>}/>
      <Route path="/dashboard" element={<Dashboard/>}/>
      <Route path="/home" element={<Home />} />
    </Routes>
  );
};
export default AppRouter;
