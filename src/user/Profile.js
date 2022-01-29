import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {getUser} from './apiUser'
import {Navigate} from "react-router-dom";

export default function Profile(){
  const [user, setUser] = useState("");
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const {userId} = useParams()

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
      <div className="container jumbotron mt-5">
       <h2 className="mb-5">Profile</h2>
       <p><b>Username: </b>{user.name}</p>
       <p><b>Email: </b>{user.email}</p>  
       <p><b>Joined: </b>{new Date(user.created).toDateString()}</p>
      </div>
     </>
    )
}