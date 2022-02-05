import {Link} from "react-router-dom";

export default function UserCard(props){
  const userLink = "/users/" + props.user._id
  return (
    <div to="/" className="d-flex user-card mt-2 mb-2 p-3" key={props.i}>
      <img className="user-img-card" src="https://www.w3schools.com/howto/img_avatar.png" alt="profile-pic" />
      <p className="ml-2" style={{display: "inline"}}>{props.user.name}</p>
      <Link className="btn btn-sm ml-auto p-2 " to={userLink}>open</Link>
    </div>
  )
}