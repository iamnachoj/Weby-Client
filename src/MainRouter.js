import React from "react";
import {Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/signup";
import Signin from "./components/signin";

export default function MainRouter(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="signup" element={<Signup />} />
      <Route path="signin" element={<Signin />} />
    </Routes>
  )  
}