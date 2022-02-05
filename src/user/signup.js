import {useState} from "react";
import {Link } from "react-router-dom";
import { signup } from "../auth";

export default function Signup() {
    const [input, setInput] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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
     

    function submitData(event){
      event.preventDefault();
      if(input.password !== input.confirmPassword){
        setInput({
          ...input,
          error: "passwords do not match"
        })
        return null
      }
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
            confirmPassword: "",
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
          <div className="form-group">
            <label htmlFor="confirmPassword" className="text-muted">Confirm password</label>
            <input onChange={handleChange} value={input.confirmPassword} name="confirmPassword" id="confirmPassword" type="password" className="form-control" />
          </div>
          {input.error ? <div className="alert alert-danger">{input.error} </div> : null}
          {input.success ? <div className="alert alert-success">Successfully created! please <Link to="/signin">log in</Link></div> : null}
          <button onClick={submitData}className="btn ml-0">Sign up</button>
        </form>
      </main>
    )
  }