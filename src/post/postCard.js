import {Link} from "react-router-dom";

export default function PostCard(props){
  const userLink = "/users/" + props.post.postedBy._id
  const postLink = "/posts/" + props.post._id
  const photoUrl = props.post.photo ? `${process.env.REACT_APP_API_URL}/users/avatar/${props.user._id}?${new Date().getTime()}` : null
  console.log(userLink)
  return (
    <div to="/" className="post-card mt-4 mb-4 p-3" key={props.i}>
      {props.post.photo ? <img src={photoUrl} alt=""/> : null}
      <h3 className="mb-3" style={{display: "block"}}>{props.post.title}</h3>
      <p>{props.post.body}</p>
      <div className="mark mb-2">
        <p className="mr-2 font-italic small" style={{display: "inline"}}>Posted by:</p>
        <Link to={userLink}>{props.post.postedBy.name}</Link>
        <br/>
      </div>
      <Link className="btn btn-sm ml-auto p-2 " to={postLink}>open</Link>
    </div>
  )
}