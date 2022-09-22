import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import HomeScreen from "./screens/homeScreen/homeScreen";
import Register from "./screens/register/register";
import Login from "./screens/login/login";
import CompanyRegister from "./screens/companyRegister/companyRegister";
import axios from "axios";
import Profile from "./screens/profile/profile";
import CompanyHome from "./screens/companyHome/companyHome";
import JobRegister from "./screens/jobRegister/jobRegister";
import JobView from "./screens/jobView/jobView";

function App() {
  defineInterceptor()
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/company" element={<CompanyHome />}></Route>
        <Route path="/company-register" element={<CompanyRegister />}></Route>
        <Route path="/job-register" element={<JobRegister />}></Route>
        <Route path="/job/:id" element={<JobView />}></Route>
      </Routes>
    </Router>
  );
}

function defineInterceptor() {
  axios.interceptors.response.use(
    (response) => {
      return response;
    },
    (err) => {
      return new Promise((resolve, reject) => {
        console.log('refresh')
        const originalReq = err.config;
        if (err.response.status == 401 && err.config && !err.config._retry) {
          originalReq._retry = true;
          let token = localStorage.getItem("TOKEN");
          let res = axios
            .put(`${process.env.REACT_APP_API_URL}token/refresh`, { oldToken: token })
            .then((res) => {
              localStorage.setItem("TOKEN", res.data.access_token);
              originalReq.headers[
                "Authorization"
              ] = `Bearer ${res.data.access_token}`;
              return axios(originalReq);
            });
          resolve(res);
        } else {
          reject(err);
        }
      });
    }
  );
}

export default App;
