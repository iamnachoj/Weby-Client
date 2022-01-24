import { Outlet, Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="jumbotron">
      <h1>Weby</h1>
      <p className="lead">Welcome to Weby!</p>
      <nav>
        <Link to="/signin">Log in</Link> |{" "}
        <Link to="/signup">Sign up</Link>
      </nav>
      <Outlet/>
    </div>
  );
}