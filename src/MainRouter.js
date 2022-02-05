import {Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Users from "./user/Users";

export default function MainRouter(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="signup" element={<Signup />} />
      <Route path="signin" element={<Signin />} />
      <Route path="users" element={<Users />} />
      <Route path="users/:userId" element={<Profile/>} />
    </Routes>
  )  
}