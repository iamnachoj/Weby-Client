import React from "react";
import {Link, useNavigate} from "react-router-dom";

function signout(next) {
  if(typeof window !== undefined){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    next();
    return fetch("http://localhost:8080/signout", {
      method: "GET"
    })
     .then(res => {
       console.log(res.status)
       return res.json()
     })
     .catch(err => console.log(err))
  }
}

export default function Menu(){
  const navigate = useNavigate("/")
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand me-2"><h1 style={{fontFamily: "'Geo', sans-serif", fontSize: "3rem"}}>Weby</h1></Link>

        <div id="navbarButtonsExample">
          <div className="d-flex align-items-center">
            <Link to="/signin" className="btn btn-lg btn-link px-2 me-1">
              Login
            </Link>
            <Link to="/signup" className="btn btn-lg btn-link px-2 me-1">
              Sign up
            </Link>
            <button onClick={() => {signout(() => {navigate("/")})}} className="btn btn-lg btn-link px-2 me-1">Sign out</button>
          </div>
        </div>

      </div>

    </nav>

  )
}