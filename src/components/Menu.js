import React from "react";
import {Link} from "react-router-dom";

export default function Menu(){
  return (
    <nav>
      <h1 style={{display: "inline"}}><Link to="/">Weby</Link></h1>
      {/* Link tag is just like anchor tag, but it does not load the page */}
      <Link to="/signin">Log in</Link> |{" "} 
      <Link to="/signup">Sign up</Link>
    </nav>
  )
}