import React from "react";

export default class Signup extends React.Component {
  constructor(){
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      error: ""
    }
  }
  render(){
    return (
      <main className="container">
        <h2 className="mt-5 mb-5">Sign up</h2>
        <form>
          <div className="form-group">
            <label for="name" className="text-muted">Name</label>
            <input id="name" type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label for="email" className="text-muted">Email</label>
            <input id="email" type="email" className="form-control" />
          </div>
          <div className="form-group">
            <label for="password" className="text-muted">Password</label>
            <input id="password" type="password" className="form-control" />
          </div>
          <button className="btn ml-0 btn-primary">Sign up</button>
        </form>
      </main>
    )
  }
}