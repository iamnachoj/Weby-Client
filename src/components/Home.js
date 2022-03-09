import { Signin } from "../user/Signin.js";

export default function Home() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
            <h1 className="mt-5">Welcome to Weby!</h1>
            <h2 className="mt-5">The Social Network</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse bibendum in mi eu ultrices. Maecenas in risus sit amet 
            tellus sollicitudin maximus vulputate vel nisi. Fusce vel arcu porttitor, sagittis augue sit amet, ullamcorper turpis.
            </p>
            <h2 className="mt-5">Faster, easier, and safer</h2>
            <p>Maecenas euismod, leo et consequat dapibus, felis augue rutrum quam, consectetur adipiscing elit. Suspendisse bibendum in mi 
            eu ultrices. Maecenas in risus sit amet tellus sollicitudin maximus vulputate vel nisi.</p>
            <h2 className="mt-5">Keep friends, no reels</h2>
            <p>Tate risus?, eget pretium mauris?... Maecenas pharetra at sapien nec sodales</p>
        </div>
        <div className="col-md-6"></div>
     </div>
    </div>
  );
}