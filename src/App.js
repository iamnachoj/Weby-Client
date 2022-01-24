import { Link } from "react-router-dom";

export default function App() {
  return (
    <div className="container">
     <div className="jumbotron">
        <h1>Weby</h1>
        <p className="lead">Welcome to Weby!</p>
        <nav>
          <Link to="/signin">Log in</Link> |{" "}
          <Link to="/signup">Sign up</Link>
        </nav>
      </div>
    </div>
  );
}