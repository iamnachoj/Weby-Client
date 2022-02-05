import { useEffect, useState } from "react";
import {Link, useParams } from "react-router-dom";
import {getUser} from './apiUser'
import {Navigate} from "react-router-dom";
import { isAuthenticated } from "../auth";
import defaultpic from "../images/avatar.png"

export default function Profile(){
  const [user, setUser] = useState("");
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const {userId} = useParams()
  const profile =  JSON.parse(localStorage.getItem("user"));
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
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    
   if(redirectToSignin){
    return <Navigate to="/signin" />
  }

    return (
      <>
      <div className="container">
       <main className="jumbotron mt-5 row">
        <div className="col-md-9">
              <h2 className="mb-5">Profile</h2>
              <div className="row">
                <div className="col-md-5">
                  <img className="user-img-card-profile mb-5" src={defaultpic} alt="profile-pic" />
                </div>
                <div className="col-md-7">
                  <p><b>Username: </b>{user.name}</p>
                  <p><b>Email: </b>{user.email}</p>  
                  <p><b>ID: </b>{user._id}</p>
                  <p><b>Joined: </b>{new Date(user.created).toDateString()}</p>
                </div>
              </div>
            {user._id === JSON.parse(localStorage.getItem("user"))._id ? null : <Link className="btn ml-0 p-2" to="/users">back</Link>}
        </div>
        {isAuthenticated() && userId === profile._id && user.name === profile.name ? 
          <div className="col-md-3">
          <div className="d-flex flex-row-reverse">
            <Link to={`/users/delete/${user._id}`} className="btn btn-sm btn-danger">Delete</Link>
            <Link to={`/users/edit/${user._id}`} className="btn btn-sm">Edit</Link>
          </div>
          
        </div>
        :
        <></>
        }
       </main>
      </div>
     </>
    )
}