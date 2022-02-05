import { Link } from "react-router-dom";

export default function DeleteButton(props) {
  return  <Link to={`/users/delete/${props.user._id}`} className="btn btn-sm btn-danger">Delete</Link>
}