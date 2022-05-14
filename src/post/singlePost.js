import { useEffect, useState } from "react";
import {Link, useParams, useNavigate } from "react-router-dom";
import {getPost, removePost} from './apiPost'
import { isAuthenticated } from "../auth";

export default function SinglePost(){
    const [post, setPost] = useState({postedBy:{_id:""}});
    const user = JSON.parse(localStorage.getItem("user"));
    const [loading, setLoading] = useState(true)
    const {postId} = useParams()
    const navigate = useNavigate();
    const token = localStorage.getItem("token")

    useEffect(()=> {
        getPost(postId)
        .then(data => {
         if(data.error){
           console.log(data.error)
         } else{
           setPost(data)
           setLoading(false)
         } 
       })
       }, [postId])

    const userLink = post.postedBy ? "/users/" + post.postedBy._id : "/posts"
    const photoUrl = post.photo ? `${process.env.REACT_APP_API_URL}/posts/photo/${post._id}` : null

    function deletePost(){
      let answer = window.confirm("Are you sure you want to delete your post?")
      if(answer){
        removePost(postId, token)
        setTimeout(() => {
          window.location.reload(true)
        },100)
        navigate(-1)
      }
    }

    return (
      <div className="container">
        <div to="/" className="post-card mt-4 mb-2 p-3">
              <h3 className="mb-3" style={{display: "block"}}>{post.title}</h3>
              <p>{post.body}</p>
              {photoUrl ? <img className="mb-3 img-thumbnail" style={{height: "200px", width: "auto"}} src={photoUrl} alt=""/> : null }
              <div className="mark mb-2">
                  <p className="mr-2 font-italic small" style={{display: "inline"}}>Posted by: {" "}
                  <Link to={userLink}>{post.postedBy ? post.postedBy.name : " Unknown"}</Link> {" "}
                  on  {new Date(post.created).toDateString()} at {new Date(post.created).toLocaleTimeString()}
                  </p>
              <br/>
          </div>
          <div>
            <button className="btn btn-sm mt-5 ml-0 p-2" onClick={() => navigate(-1)}>back</button>
            {isAuthenticated() && user._id === post.postedBy._id
              ? <div style={{marginTop: "-85px"}} className="d-flex flex-row-reverse">
                  <button onClick={() => {deletePost()}} className="btn btn-sm btn-danger mt-5 ml-0 p-2">Delete</button>
                  <button onClick={() => {}} className="btn btn-sm btn-warning mt-5 ml-0 p-2">Edit</button>
                </div>
              : <></>
            }
          </div>
        </div>
        {loading ? <div className="alert alert-primary">Loading...</div>: null }
      </div>  
    )
}