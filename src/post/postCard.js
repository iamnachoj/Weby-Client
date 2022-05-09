import {Link} from "react-router-dom";

export default function PostCard(props){
  const userLink = props.post.postedBy ? "/users/" + props.post.postedBy._id : "/posts"
  const postLink = "/posts/" + props.post._id
  const photoUrl = props.post.photo ? `${process.env.REACT_APP_API_URL}/posts/photo/${props.post._id}` : null
  return (
    <div to="/" className="post-card mt-4 mb-2 p-3" key={props.i}>
      <h3 className="mb-3" style={{display: "block"}}>{props.post.title}</h3>
      <p>{props.post.body.length > 150 ? props.post.body.substring(0, 150) + " [...]" : props.post.body}</p>
      {photoUrl ? <img className="mb-3 img-thumbnail" style={{height: "200px", width: "auto"}} src={photoUrl} alt=""/> : null }
      <div className="mark mb-2">
        <p className="mr-2 font-italic small" style={{display: "inline"}}>Posted by: {" "}
         <Link to={userLink}>{props.post.postedBy ? props.post.postedBy.name : " Unknown"}</Link> {" "}
         on  {new Date(props.post.created).toDateString()} at {new Date(props.post.created).toLocaleTimeString()}
        </p>
        <br/>
      </div>
      <Link className="btn btn-sm ml-auto p-2 " to={postLink}>Read more</Link>
    </div>
  )
}