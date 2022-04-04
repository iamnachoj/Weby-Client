import { useEffect } from "react";
import { useState } from "react/cjs/react.development"
import { getPosts } from "./apiPost";
import PostCard from "./postCard";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
   getPosts()
   .then(data => {
    if(data.error){
      console.log(data.error)
    } else{
      setPosts(data)
    } 
   }
   )
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container">
      <h2 className="mt-5 mb-5">Recent posts</h2>
          {posts.map((post, i) => {
            return <PostCard key={i} post={post}/>
            })
          }
    </div>
  )
}


