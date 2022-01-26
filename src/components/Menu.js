import React from "react";
import {Link} from "react-router-dom";

export default function Menu(){
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <Link to="/" className="navbar-brand me-2"><h1 style={{fontFamily: "'Geo', sans-serif", fontSize: "3rem"}}>Weby</h1></Link>

        <div id="navbarButtonsExample">
          <div class="d-flex align-items-center">
            <Link to="/signin" className="btn btn-lg btn-link px-2 me-1">
              Login
            </Link>
            <Link to="/signup" className="btn btn-lg btn-link px-2 me-1">
              Sign up
            </Link>
          </div>
        </div>

      </div>

    </nav>

  )
}