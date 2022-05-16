import {useState} from "react";
import {Navigate, Link} from "react-router-dom";
import { signin } from "../auth";

export default function Signin() {
  const [input, setInput] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
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


  function submitData(event) {
    event.preventDefault();
    setInput({
      ...input,
      loading: true
    })
    const user = input
    signin(user).then(data => {
      if(data.error){
        setInput({
          ...input,
          loading: false,
          error: data.error
        })
      } else {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user))
        setInput({
          email: "",
          password: "",
          error: "",
          loading: false,
          redirect: true})
      }
    })
  }

  if(input.redirect){
    return <Navigate to="/posts" />
  }

  return (

    <main className="container mt-5">
      <div className="row">
        <div className="col-md-3"></div>
        <div className="col-md-6 mt-2">
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
            {input.loading ? <div className="alert alert-primary">Loading...</div>: null }
            <button onClick={submitData}className="btn ml-0">Log in</button>
          </form>
          <h6 style={{display: "inline"}}>Not an user?</h6><Link to="/signup"> sign up</Link>
        </div>
        <div className="col-md-3"></div>
     </div>
   </main>
  );
}