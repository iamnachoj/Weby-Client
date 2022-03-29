import {Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Users from "./user/Users";
import EditProfile from "./user/editprofile";
import NewPost from "./post/NewPost";

export default function MainRouter(){
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="signup" element={<Signup />} />
      <Route path="signin" element={<Signin />} />
      <Route path="users" element={<Users />} />
      <Route path="users/:userId" element={<Profile/>} />
      <Route path="/users/edit/:userId" element={<EditProfile/>}/>
      <Route path="/post/create" element={<NewPost/>}/>
    </Routes>
  )  
}