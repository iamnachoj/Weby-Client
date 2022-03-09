import React, { useEffect, useState } from 'react';

export default function ProfileTabs(props){
    const [followers, setFollowers] = useState(0)
    const [following, setFollowing] = useState(0)
    useEffect(()=>{
        setTimeout(() =>{
            setFollowers(props.followers.length)
        setFollowing(props.following.length)
        },100)
        
    })
   return (
       <div>
           <span><b>Followers: </b>{followers} </span>
           <span className="border-left p-1"><b>Following: </b> {following}</span>
       </div>
   )
}