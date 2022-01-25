import React, {useState} from "react";
import {Link } from "react-router-dom";

export default function Signup() {
    const [input, setInput] = useState({
      name: "",
      email: "",
      password: "",
      error: ""
    });
    
    function handleChange(event) {
     let {value, name} = event.target;
     setInput({
       ...input,
       error: "",
       [name]: value
     })
    }
     
    function signup(user) {
      return fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          Accept: "application/JSON",
          "Content-Type": "application/JSON"
        },
        body: JSON.stringify(user)
      })
      .then((response) => {return response.json()})
      .catch(err => console.log(err))
    }

    function submitData(event){
      event.preventDefault();
      const user = input;
      signup(user).then(data => {
        if(data.error){
          setInput({
            ...input,
            error: data.error
          })
        } else {
          setInput({
            name: "",
            email: "",
            password: "",
            error: "",
            success: true
          })
        }
      })
    }
    return (
      <main className="container">
        <h2 className="mt-5 mb-5">Sign up</h2>
        <form>
          <div className="form-group">
            <label htmlFor="name" className="text-muted">Name</label>
            <input onChange={handleChange} value={input.name} name="name" id="name" type="text" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="text-muted">Email</label>
            <input onChange={handleChange} value={input.email} name="email" id="email" type="email" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="text-muted">Password</label>
            <input onChange={handleChange} value={input.password} name="password" id="password" type="password" className="form-control" />
          </div>
          {input.error ? <div className="alert alert-danger">{input.error} </div> : null}
          {input.success ? <div className="alert alert-success">Successfully created! please <Link to="/signin">log in</Link></div> : null}
          <button onClick={submitData}className="btn ml-0 btn-primary">Sign up</button>
        </form>
      </main>
    )
  }