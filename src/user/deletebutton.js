import { useState } from "react"
import { removeUser } from "./apiUser"
import { signout } from "../auth"
import { Navigate } from "react-router-dom"

export default function DeleteButton(props) {
  const [redirect, setRedirect] = useState(false)

  function confirmDelete() {
    let answer = window.confirm("Are you sure you want to delete your account?")
    if(answer){
      return deleteAccount()
    }
  }

  function deleteAccount() {
    if(localStorage.getItem("token")){
      let token = localStorage.getItem("token")
      removeUser(props.user._id, token)
      .then(data => {
        if(data.error){
          console.log(data.error)
        } else {
           signout(() => {console.log("user removed")})
           setRedirect(true)
        }
      })
    }
  }
  if(redirect){
    return <Navigate to="/signin"/>
  }
  return (
  <button onClick={confirmDelete} className="btn btn-sm btn-danger">Delete</button>
  )
}