import {Link, useNavigate} from "react-router-dom";
import { signout, isAuthenticated } from "../auth";

export default function Menu(){
  const navigate = useNavigate() // allows to redirect without refreshing the page
  const user = JSON.parse(localStorage.getItem("user"))
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        {isAuthenticated()
        ?
        <Link to="/posts" className="navbar-brand me-2"><h1 className="brand" style={{fontFamily: "'Geo', sans-serif"}}>Weby</h1></Link>
        :
        <Link to="/" className="navbar-brand me-2"><h1 style={{fontFamily: "'Geo', sans-serif", fontSize: "3rem"}}>Weby</h1></Link>
      }
        <div>
          <div className="d-flex align-items-center">
          {isAuthenticated()
          ?
          <>
            <Link to="/posts" className="btn btn-link btn-md px-1 ml-1">Posts</Link>
            <Link className="btn btn-link btn-md px-1 ml-1" to="/users">Users</Link>  
            <Link to={`/users/${user._id}`} className="btn btn-success btn-md px-1 ml-4 me-1 menu-btn">
              <i className="far fa-user mr-2"></i>
              {user.name}
            </Link>
            <button onClick={() => {
              let answer = window.confirm("Are you sure you want to log out?")
              if(answer){
               signout(() => {
               navigate("/")}
               )}
              }} className="btn btn-link btn-md px-1 ml-2 me-1">Sign out</button>
          </>
          :
          <>
            <Link to="/signin" className="btn btn-lg btn-link px-2 me-1">
              Log in
            </Link>
          </>
           }
          </div>
        </div>

      </div>

    </nav>

  )
}