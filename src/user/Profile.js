import React from "react";
import {Link} from "react-router-dom";
import { isAuthenticated } from "../auth";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"))
   
    return(
       <div className="container">
       {isAuthenticated()
        ?
        <div className="jumbotron mt-4">
          <h2 className="mb-5">Profile</h2>
          <p>User name: {user.name}</p>
          <p>Email: {user.email}</p>
        </div>
        :
        <h2 className="alert alert-primary mt-5">
           No user. Please, <Link to="/signin">Log in</Link>
        </h2>
       }
         
       </div>
    )
}