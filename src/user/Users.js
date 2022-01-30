import { useEffect } from "react";
import { useState } from "react/cjs/react.development"
import { getUsers } from "./apiUser";

export default function Users() {
  const [users, setUsers] = useState([]);

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
            return <div className="card mt-2 mb-2 p-3" key={i}>{user.name}</div>})}
    </div>
  )
}


