import {Routes, Route} from "react-router-dom";
import Home from "./components/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Profile from "./user/Profile";
import Users from "./user/Users";
import Posts from "./post/posts";
import EditProfile from "./user/editprofile";
import NewPost from "./post/NewPost";
import SinglePost from "./post/singlePost";
import EditPost from "./post/editPost";
import { isAuthenticated } from "./auth";
export default function MainRouter(){
  return (
    <Routes>
      {/* implement different route from "/" path depending on whether user is logged in or not */}
      <Route path="/" element={isAuthenticated() ? <Posts /> : <Home />} /> 
      <Route path="signup" element={<Signup />} />
      <Route path="signin" element={<Signin />} />
      <Route path="posts" element={<Posts />} />
      <Route path="users" element={<Users />} />
      <Route path="users/:userId" element={<Profile/>} />
      <Route path="/users/edit/:userId" element={<EditProfile/>}/>
      <Route path="/post/create" element={<NewPost/>}/>
      <Route path="posts/:postId" element={<SinglePost/>} />
      <Route path="posts/edit/:postId" element={<EditPost/>}/>
    </Routes>
  )  
}