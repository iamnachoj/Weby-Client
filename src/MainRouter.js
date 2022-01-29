import {Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Signup from "./user/signup";
import Signin from "./user/signin";
import Profile from "./user/Profile";

export default function MainRouter(){
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="signup" element={<Signup />} />
      <Route path="signin" element={<Signin />} />
      <Route path="users/:userId" element={<Profile />} />
    </Routes>
  )  
}