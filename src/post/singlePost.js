import { useEffect, useState } from "react";
import {Link, useParams } from "react-router-dom";
import {getPost} from './apiPost'

export default function SinglePost(){
    const [post, setPost] = useState({});
    const {postId} = useParams()
    useEffect(()=> {
        getPost(postId)
        .then(data => {
         if(data.error){
           console.log(data.error)
         } else{
           setPost(data)
         } 
       })
       }, [postId])
       const userLink = post.postedBy ? "/users/" + post.postedBy._id : "/posts"
       const photoUrl = post.photo ? `${process.env.REACT_APP_API_URL}/posts/photo/${post._id}` : null
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
        <Link className="btn mt-5 ml-0 p-2" to="/posts">back</Link>
        </div>
      </div>  
    )
}