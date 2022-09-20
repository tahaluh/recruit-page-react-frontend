import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.scss";
import HomeScreen from "./screens/homeScreen/homeScreen";
import Register from "./screens/register/register";
import Login from "./screens/login/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>      
    </Router>
  );
}

export default App;
