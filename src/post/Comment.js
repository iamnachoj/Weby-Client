import { useState } from "react/cjs/react.development"
import { useNavigate, Link } from "react-router-dom";
import {createComment, removeComment} from "./apiPost";

export default function Comment(props){
  const [comment, setComment] = useState({text: "", postedBy: {name: "", _id: ""}})
  const navigate = useNavigate();
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const token = localStorage.getItem("token") ? localStorage.getItem("token") : "Unknown";
  const postId = props.postId
  function handleChange(event){
    let value = event.target.value;
    setComment(value)
  }

  function clickSubmit(event){
    event.preventDefault();
    createComment(user._id, postId, token, comment)
    .then(data => {
      if(data.error){
        console.log(data.error)
        navigate("/signin")
      } else {
        props.setPost(data) //passing a function as props. The solution to avoid reloading the page
        setComment({text: ""})
        // setTimeout(() => {
        //   window.location.reload(true)
        // },300)
      }
    })
  }
  function deleteComment(comment){
   let answer = window.confirm("Are you sure you want to delete your post?")
   if(answer){
   removeComment(user._id, postId, token, comment)
    .then(data => {
      if(data.error){
        console.log(data.error)
        navigate("/signin")
      } else {
        console.log("here we arrived")
        props.setPost(data) //passing a function as props. The solution to avoid reloading the page
        // setTimeout(() => {
        //   window.location.reload(true)
        // },300)
      }
    })
   } else {
     console.log("aborted")
   }

  }

  return (
    <div className="ml-2 mr-2">
     <h4 className="mt-4 mb-2">Comments</h4><hr></hr>
     {props.post.comments.length 
     ? <>
       {/* Comments from props */}
       {props.comments.map((comment, i) => {
         return (
           <div className="post-card mt-2 mb-4 p-2" key={props.key}>
             <p className="mb-0"><b>{comment.postedBy.name}: </b>{comment.text}</p>
             <span className="mark font-italic small">{new Date(comment.created).toDateString()} at {new Date(comment.created).toLocaleTimeString()}</span>
             {user._id === comment.postedBy._id ? <button onClick={() => deleteComment(comment)} className="float-right" style={{border: "0", backgroundColor: "white"}}><i className="fa fa-trash" style={{color: "red"}}></i></button> : <></>}
           </div>
         )
       })}
       </> 
     : <h6 className="ml-1 mt-4 mb-4">No comments yet. Start a conversation!</h6>}
     <hr></hr>
     {user 
     ? <form className="mt-4">
          <div className="form-group">
            <textarea placeholder="add a comment..." onChange={handleChange} value={comment.text} name="text" type="text" className="form-control" />
            <button onClick={clickSubmit} className="btn btn-sm btn-primary mt-2 ml-0">Add Comment</button>
          </div>     
        </form> 
      : <h5 className="m-2"><Link to={"/signin"}>Log in</Link> to add a comment</h5>
     }
     
    </div>
  )
}