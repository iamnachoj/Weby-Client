import React, {useState} from "react";
import {Navigate} from "react-router-dom";

export default function Signin() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    error: "",
    redirect: false
  })

  function handleChange(event) {
    let {value, name} = event.target;
    setInput({
      ...input,
      error: "",
      [name]: value
    })
   }

  function signin(user) {
    return fetch("http://localhost:8080/signin", {
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

  function submitData(event) {
    event.preventDefault();
    const user = input
    signin(user).then(data => {
      if(data.error){
        setInput({
          ...input,
          error: data.error
        })
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user))
        setInput({
          email: "",
          password: "",
          error: "",
          redirect: true})
      }
    })
  }

  if(input.redirect){
    return <Navigate to="/signedin" />
  }

  return (
    <main className="container">
        <h2 className="mt-5 mb-5">Log in</h2>
        <form>
          <div className="form-group">
            <label htmlFor="email" className="text-muted">Email</label>
            <input onChange={handleChange} value={input.email} name="email" id="email" type="email" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="text-muted">Password</label>
            <input onChange={handleChange} value={input.password} name="password" id="password" type="password" className="form-control" />
          </div>
          {input.error ? <div className="alert alert-danger">{input.error} </div> : null}
          {input.redirect ? <div className="alert alert-success">Success! loading...</div> : null}
          <button onClick={submitData}className="btn ml-0 btn-primary">Sign up</button>
        </form>
      </main>
  );
}