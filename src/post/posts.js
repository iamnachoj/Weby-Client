import { useEffect } from "react";
import { useState } from "react/cjs/react.development"
import { getPosts } from "./apiPost";
import PostCard from "./postCard";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
   getPosts()
   .then(data => {
    if(data.error){
      console.log(data.error)
    } else{
      setPosts(data)
      setLoading(false)
    } 
   }
   )
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div className="container">
      <h2 className="mt-5 mb-5 font-weight-bold">Recent posts</h2>
          {posts.map((post, i) => {
            return <PostCard key={i} post={post}/>
            })
          }
    {loading ? <div className="alert alert-primary">Loading...</div>: null }
    </div>
  )
}


