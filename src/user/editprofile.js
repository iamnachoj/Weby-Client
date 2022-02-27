import defaultpic from "../images/avatar.png"
import { Link, Navigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import {getUser} from './apiUser'
import { updateUser } from "./apiUser"

const userData = new FormData()
export default function EditProfile() {
   const [loading, setLoading] = useState(false)
   const [user, setUser] = useState({});
   const {userId} = useParams()
   useEffect(()=> {
    getUser(userId)
    .then(data => {
     if(data.error){
       console.log(data.error)
     } else{
       setUser(data)
     } 
   })
   }, [userId]) 

   function handleChange(event) {
    let name = event.target.name;
    let value = name === "avatar" ? event.target.files[0] : event.target.value;
    const fileSize = name === "avatar" ? event.target.files[0].size : 0;
    userData.set(name, value);
    setUser({
      ...user,
      fileSize,
      error: "",
      [name]: value
    })
   }
   function clickSubmit(event) {
    event.preventDefault();
    setLoading(true)
    if(user.fileSize > 500000){
      setUser({
        ...user,
        error: "file is too big. maximum just 2 mb"
      })
      setLoading(false)
      return null
    }
    if(user.password !== user.confirmPassword){
      setUser({
        ...user,
        error: "passwords do not match"
      })
      setLoading(false)
      return null
    } else {
    const token = localStorage.getItem("token")
    updateUser(userId, userData, token)
     .then(data => {
          setUser({
            _id: userId,
            redirect: true
          })
     })
    }
   }

   if(user.redirect){
     return <Navigate to={`/users/${user._id}`}/>
   }
   const avatarUrl = user._id ? `${process.env.REACT_APP_API_URL}/users/avatar/${user._id}?${new Date().getTime()}` : defaultpic

   return (
    <div className="container">
    <main className="jumbotron mt-5 row">
     <div className="col-md-9">
           <h2 className="mb-5">Edit Profile</h2>
           <div className="row">
             <div className="col-md-5">
               <img className="user-img-card-profile mb-5" src={avatarUrl} alt="profile-pic" />
             </div>
             <div className="col-md-7">
             <form>
                <div className="form-group">
                  <label htmlFor="name" className="text-muted">Name</label>
                  <input onChange={handleChange} value={user.name || ""} name="name" id="name" type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="avatar" className="text-muted">Avatar</label>
                  <input onChange={handleChange} name="avatar" id="avatar" type="file" accept="image/*" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="email" className="text-muted">Email</label>
                  <input onChange={handleChange} readOnly value={user.email || ""} name="email" id="email" type="email" className="form-control"/>
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="text-muted">New password</label>
                  <input onChange={handleChange} value={user.password || ""} name="password" id="password" type="password" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword" className="text-muted">Confirm new password</label>
                  <input onChange={handleChange} value={user.confirmPassword || ""} name="confirmPassword" id="confirmPassword" type="password" className="form-control" />
                </div>
                {user.error ? <div className="alert alert-danger">{user.error}</div> : null}
                {loading ? <div className="alert alert-primary">Loading...</div>: null }
                <button onClick={clickSubmit} className="btn btn-sm ml-0">Update</button>
                <Link to={`/users/${user._id}`} className="btn btn-sm btn-primary">go back</Link>
              </form>
             </div>
           </div>
      </div>
     </main>
    </div>
   )
}