import { useEffect } from "react";
import { useState } from "react/cjs/react.development"
import { getUsers } from "./apiUser";
import UserCard from "./UserCard";

export default function Users() {
  const [users, setUsers] = useState([]);
  console.log()
  useEffect(() => {
   getUsers()
   .then(data => {
    if(data.error){
      console.log(data.error)
    } else{
      setUsers(data)
    } 
   }
   )
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Users</h2>
          {users.map((user, i) => {
            if(user._id === JSON.parse(localStorage.getItem("user"))._id){
              return null
            }
            return <UserCard key={i} user={user}/>})}
    </div>
  )
}


