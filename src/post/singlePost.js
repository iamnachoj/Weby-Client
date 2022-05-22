import { useEffect, useState } from "react";
import {Link, useParams, useNavigate } from "react-router-dom";
import {getPost, removePost, like, unlike} from './apiPost'
import { isAuthenticated } from "../auth";
import Comment from "./Comment";

export default function SinglePost(){
    const [post, setPost] = useState({likes: [], comments: [{postedBy: {name: "", _id:""}}], postedBy:{_id:""}});
    const [liked, setLiked] = useState(false)
    const [loading, setLoading] = useState(true)
    const {postId} = useParams()
    const navigate = useNavigate();
    const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {};
    const token = localStorage.getItem("token") ? localStorage.getItem("token") : "Unknown"

    useEffect(()=> {
        getPost(postId)
        .then(data => {
         if(data.error){
           console.log(data.error)
           navigate("/signin")
         } else{
           setPost(data)
           setLoading(false)
         } 
       })
       }, [postId, navigate])
    const numberOfLikes = post.likes.length
    const numberOfComments = post.comments.length
    const userLink = post.postedBy ? "/users/" + post.postedBy._id : "/posts"
    const photoUrl = post.photo ? `${process.env.REACT_APP_API_URL}/posts/photo/${post._id}` : null

    function deletePost(){
      let answer = window.confirm("Are you sure you want to delete your post?")
      if(answer){
        removePost(postId, token)
        setTimeout(() => {
          navigate("/posts")
        },2000)
        setLoading(true)
      }
    }

    function likeToggle(){
      let callApi = post.likes.includes(user._id) ? unlike : like;
      callApi(user._id, postId, token)
      .then(data => {
        if(data.error){
          console.log(data.error)
          navigate("/signin")
        } else {
          setLiked(liked ? false : true)
          setPost({...data, postedBy : post.postedBy})
          console.log(data)
          return data
        }
      })
    }
    
    return (
    <>  
    { post.title 
      ? <div className="container">
      <div to="/" className="post-card mt-4 mb-2 p-3">
            <button className="btn btn-sm btn-primary mt-3 ml-0 p-2" onClick={() => navigate("/posts")}> &lt; go back</button>
            {isAuthenticated() && user._id === post.postedBy._id
            ? <div style={{marginTop: "-85px"}} className="d-flex flex-row-reverse">
                <button onClick={() => {deletePost()}} className="btn btn-sm btn-danger mt-5 ml-0 p-2">Delete</button>
                <Link to={"/posts/edit/" + postId} className="btn btn-sm btn-warning mt-5 ml-0 p-2">Edit</Link>
              </div>
            : <></>
            }
            <hr></hr>
            <h3 className="mb-3" style={{display: "block"}}>{post.title}</h3>
            <p>{post.body}</p>
            {photoUrl ? <img className="mb-3 img-thumbnail" style={{height: "300px", width: "auto"}} src={photoUrl} alt=""/> : null }
            <div className="mark mb-2">
                <p className="mr-2 font-italic small" style={{display: "inline"}}>Posted by: {" "}
                <Link to={userLink}>{post.postedBy ? post.postedBy.name : " Unknown"}</Link> {" "}
                on  {new Date(post.created).toDateString()} at {new Date(post.created).toLocaleTimeString()}
                </p>
            <br/>
            </div>
            <div>
             {numberOfLikes ? <><p style={{display: "inline"}} className="h6 ml-0"><i className="fa fa-lg fa-thumbs-up ml-1"></i> {numberOfLikes}</p></> : <></>}
             {numberOfComments ? <><p style={{display: "inline"}} className="h6 ml-0"><i className="fa fa-lg fa-comment ml-1"></i> {numberOfComments}</p></> : <></>}
            </div>
            <button className="btn btn-sm mt-3 p-2" onClick={() => likeToggle()}>{post.likes.includes(user._id) ? <><i className="fa fa-thumbs-down text-danger"></i> Unlike post</> : <><i className="fa fa-thumbs-up text-success"></i> Like post</>}</button>
        <div >
          <Comment comments={post.comments} postId={postId} setPost={setPost} post={post}/>
        </div>
      </div>
      
    </div>  
    : <div className="container mt-5">{loading ? <div className="alert alert-primary">Loading...</div>: null }</div> 
    }
    </>
    )
}