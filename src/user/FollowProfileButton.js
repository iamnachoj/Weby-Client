import React from "react";

export default function FollowButton(props) {
 return (
     <div className="d-inline-block mt-2">
        { props.isBeingFollowed
          ? 
            <button className="btn btn-sm btn-light">
              Unfollow
            </button> 
          :
            <button className="btn btn-sm btn-info">
              Follow
            </button>
        }  
     </div>
 )
}