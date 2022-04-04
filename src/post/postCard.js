import {Link} from "react-router-dom";

export default function PostCard(props){
  const postLink = "/posts/" + props.post._id
  const photoUrl = props.post.photo ? `${process.env.REACT_APP_API_URL}/users/avatar/${props.user._id}?${new Date().getTime()}` : null
  return (
    <div to="/" className="d-flex post-card mt-2 mb-2 p-3" key={props.i}>
      {props.post.photo ? <img src={photoUrl}/> : null}
      <h3 className="ml-2" style={{display: "inline"}}>{props.post.title}</h3>
      <p>{props.post.body}</p>
      <Link className="btn btn-sm ml-auto p-2 " to={postLink}>open</Link>
    </div>
  )
}