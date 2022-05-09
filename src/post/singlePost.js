import { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import {getPost} from './apiPost'

export default function SinglePost(){
    const [post, setPost] = useState({});
    const {postId} = useParams()
    useEffect(()=> {
        getPost(postId)
        .then(data => {
         if(data.error){
           console.log(data.error)
         } else{
           setPost(data[0])
         } 
       })
       }, [postId])
    return (
        <div>
            <p>this post is {postId}</p>
            {console.log(post)}
            <p>{post.title}</p>
            <p>{post.body}</p>
        </div>
    )
}