import { Link, Navigate } from "react-router-dom"
import { useState, useEffect } from "react"
import {create} from './apiPost'

const postData = new FormData()
export default function NewPost() {
   const [loading, setLoading] = useState(false)
   const [post, setPost] = useState({
       title: "",
       body: "",
       photo: "",
       error: "",
       user: {},
       fileSize: 0,
       created: false
   });
   useEffect(()=> {
    const user = localStorage.getItem("user")
    setPost({
        ...post,
        user: user
    })
   }, [])// eslint-disable-line react-hooks/exhaustive-deps 

   function handleChange(event) {
    let name = event.target.name;
    let value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    postData.set(name, value);
    setPost({
      ...post,
      fileSize,
      error: "",
      [name]: value
    })
   }
   function clickSubmit(event) {
    event.preventDefault();
    setLoading(true)
    if(post.fileSize > 500000){
      setPost({
        ...post,
        error: "file is too big. maximum just 2 mb"
      })
      setLoading(false)
      return null
    }
    if(post.title.length === 0 || post.body.length === 0){
      setPost({
        ...post,
        error: "All fields are required"
      })
      setLoading(false)
      return null
    } else {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const userId = JSON.parse(user)._id;

    create(userId, token, postData)
     .then(data => {
          if(data.error){
              setPost({...post, error: data.error})
              setLoading(false)
            }
          else {
            setLoading(false)
            setPost({...post, title: "", body: "", photo: "", created: true})
          }
     })
    }
   }

   if(post.created){
     return <Navigate to={`/posts`}/>
   }

   return (
    <div className="container">
    <main className="jumbotron mt-5 row">
     <div className="col-md-9">
           <h2 className="mb-5">New Post</h2>
           <div>
             <div>
             <form>
                <div className="form-group">
                  <label htmlFor="title" className="text-muted">Title</label>
                  <input onChange={handleChange} value={post.title} name="title" id="title" type="text" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="photo" className="text-muted">Photo</label>
                  <input onChange={handleChange} name="photo" id="photo" type="file" accept="image/*" className="form-control" />
                </div>
                <div className="form-group">
                  <label htmlFor="body" className="text-muted">Body</label>
                  <textarea onChange={handleChange} value={post.body} name="body" id="body" type="text" className="form-control" />
                </div>
                {post.error ? <div className="alert alert-danger">{post.error}</div> : null}
                {loading ? <div className="alert alert-primary">Creating post...</div>: null }
                {post.created ? <div className="alert alert-success">Successfully created! click <Link to="/">here</Link> to see post.</div> : null }
                <button onClick={clickSubmit} className="btn btn-sm ml-0">Create new post</button>
                <Link to={`/users/${post.user._id}`} className="btn btn-sm btn-primary">go back</Link>
              </form>
             </div>
           </div>
      </div>
     </main>
    </div>
   )
}