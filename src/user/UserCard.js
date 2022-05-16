import {Link} from "react-router-dom";
import defaultpic from "../images/avatar.png"

export default function UserCard(props){
  const userLink = "/users/" + props.user._id
  const avatarUrl = props.user.avatar ? `${process.env.REACT_APP_API_URL}/users/avatar/${props.user._id}?${new Date().getTime()}` : defaultpic
  return (
    <div to="/" className="d-flex user-card mt-2 mb-2 p-3" key={props.i}>
      <img className="user-img-card" src={avatarUrl} alt="" />
      <p className="ml-2" style={{display: "inline"}}>{props.user.name}</p>
      <Link className="btn btn-sm ml-auto p-2 " to={userLink}>open</Link>
    </div>
  )
}