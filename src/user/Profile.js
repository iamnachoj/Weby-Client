import { useEffect, useState } from "react";
import {Link, useParams, useNavigate } from "react-router-dom";
import {getUser} from './apiUser'
import { getPostsByUser } from "../post/apiPost";
import {Navigate} from "react-router-dom";
import { isAuthenticated } from "../auth";
import defaultpic from "../images/avatar.png"
import DeleteButton from "./deletebutton";
import FollowButton from "./FollowProfileButton";
import ProfileTabs from "./ProfileTabs";
import PostCard from "../post/postCard";

export default function Profile(props){
  const [user, setUser] = useState({followers: []});
  const [posts, setPosts] = useState([]);
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const {userId} = useParams()
  const navigate = useNavigate();
  const profile =  JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token")
   // useEffect is a hook that takes the same job as ComponentDidMount in class components. 
   // this function will therefore apply this function as soon as the component mounts.
   useEffect(()=> {
     getUser(userId)
     .then(data => {
      if(data.error){
        setRedirectToSignin(true)
      } else{
        setUser(data)
      } 
    })
    }, [userId]) 
  
    useEffect(()=> {
      getPostsByUser(userId, token)
      .then(data => {
       if(data.error){
         setRedirectToSignin(true)
       } else{
         setPosts(data)
       } 
     })
     }, [userId, token]) 
    
   if(redirectToSignin){
    return <Navigate to="/signin" />
  }
  function following() {
    const match = user.followers.find(follower => {
      return follower._id === profile._id
    })
    if(match){
      return true
    }
    return false
  }
  const avatarUrl = user._id ? `${process.env.REACT_APP_API_URL}/users/avatar/${user._id}?${new Date().getTime()}` : defaultpic
    return (
      <>
      <div className="container">
        {!user.name
        ? <div className="alert alert-primary mt-5">Loading...</div> 
        :  <main className="jumbotron mt-5 row">
            <div className="col-md-9">
              <h2 className="mb-5">Profile</h2>
              <div className="row">
                    <div className="col-md-6">
                      <img className="user-img-card-profile mb-5" src={avatarUrl} alt="profile-pic" />
                      <ProfileTabs className="mb-5" followers={user.followers} following={user.following}/>
                    </div>
                    <div className="col-md-6">
                      <p><b>Username: </b>{user.name}</p>
                      <p><b>Email: </b>{user.email}</p>  
                      <p><b>About {user.name}: </b>{user.about}</p>
                      <p><b>Joined: </b>{new Date(user.created).toDateString()}</p>
                      {userId === profile._id ? <></> : <FollowButton userId={userId} followId={profile._id} following={following()}/>}
                    </div>
                  </div>
          </div> 
          {isAuthenticated() && userId === profile._id ? 
            <div className="col-md-3">
              <div className="d-flex flex-row-reverse">
                <DeleteButton user={user}/>
                <Link to={`/users/edit/${user._id}`} className="btn btn-sm">Edit</Link>
              </div>
            </div>
          :<div className="col-md-3">
            <div className="d-flex flex-row-reverse"></div>
                {user._id === JSON.parse(localStorage.getItem("user"))._id ? null : <button className="btn btn-sm" onClick={() => navigate(-1)}>Go back</button>}
            </div>
          }
        </main>
        }
        <div className="mt-5">
          {posts.length 
          ? <div>
              <h2 style={{display: "inline"}}>Posts by {user.name}</h2>
              {
                  isAuthenticated() && userId === profile._id
                   ? <div style={{display: "inline"}}>
                        <div style={{marginTop: "-35px"}} className="d-flex flex-row-reverse">
                         <Link className="btn btn-sm mt-0 btn-primary" to="/post/create">new Post</Link>
                        </div>
                     </div>
                   : <></>
                  }
              <hr className="mb-5"></hr>
                  {posts.map((post, i) => {
                    return <PostCard key={i} post={post}/>
                    })
                  }
            </div>
          : <></>}
        </div>
      </div>
     </>
    )
}