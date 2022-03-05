import React, {useState} from "react";

export default function FollowButton(props) {
  const token = localStorage.getItem("token")
  const userId = props.userId; // the profile that's been viewed
  const followId = props.followId //the user logged in

 function follow(){
   console.log("follow user")
   return fetch(process.env.REACT_APP_API_URL + "/users/follow", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` // sending this, I am authorized to get the user
    },
    body: JSON.stringify({userId, followId})
  })
  .then((response) => {return response.json()})
  .catch(err => console.log(err))
 }
 function unfollow(){
   console.log("unfollow user")
   return fetch(process.env.REACT_APP_API_URL + "/users/unfollow", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}` // sending this, I am authorized to get the user
    },
    body: JSON.stringify({userId, followId})
  })
  .then((response) => {return response.json()})
  .catch(err => console.log(err)) 
 }
 return (
     <div className="d-inline-block mt-2">
        { props.following
          ? 
            <button onClick={unfollow} className="btn btn-sm btn-light">
              Unfollow
            </button> 
          :
            <button onClick={follow} className="btn btn-sm btn-info">
              Follow
            </button>
        }  
     </div>
 )
}