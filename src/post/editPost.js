import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { getPost } from "./apiPost"

const postData = new FormData()
export default function EditPost(){
  const {postId} = useParams()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState({});
  const photoUrl = post.photo ? `${process.env.REACT_APP_API_URL}/posts/photo/${post._id}` : null

  useEffect(()=> {
    getPost(postId)
    .then(data => {
     if(data.error){
       console.log(data.error)
     } else{
       setPost(data)
     } 
   })
   }, [postId]) 

  function handleChange(event) {
    let name = event.target.name;
    let value = name === "photo" ? event.target.files[0] : event.target.value;
    const fileSize = name === "photo" ? event.target.files[0].size : 0;
    postData.set(name, value);
    setPost({
      ...post,
      fileSize,
      error: "",
      [name]: value
    })
   }

   function clickSubmit(event) {
        event.preventDefault();
        setLoading(true)
        if(post.fileSize > 500000){
            setPost({
                ...post,
                error: "file is too big. maximum just 2 mb"
            })
            setLoading(false)
            return null
        }
    }


  return (
    <div className="container">
        <main className="jumbotron mt-5 row">
        <div className="col-md-12">
         <h2 className="mb-5">Edit post</h2>
         <div className="row">
                {post.photo 
                ? <div className="col-md-5">
                    <img className="post-img-card mb-5" src={photoUrl} alt="post-pic" />
                </div>
                : <></>
                }
             <div className={post.photo ? "col-md-7" : "col-md-12"}>
                <form>
                    <div className="form-group">
                        <label htmlFor="title" className="text-muted">Title</label>
                        <input onChange={handleChange} value={post.title || ""} name="title" id="title" type="text" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="photo" className="text-muted">Photo</label>
                        <input onChange={handleChange} name="photo" id="photo" type="file" accept="image/*" className="form-control" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="body" className="text-muted">Body</label>
                        <textarea onChange={handleChange} value={post.body || ""} name="body" id="body" type="text" className="form-control" />
                    </div>
                    {post.error ? <div className="alert alert-danger">{post.error}</div> : null}
                    {loading ? <div className="alert alert-primary">Updating post...</div>: null }
                    <button onClick={clickSubmit} className="btn btn-sm btn-primary ml-0">Update post</button>
                </form>
                <button  onClick={() => navigate(-1)} className="btn btn-sm btn ml-0">Go back</button>
             </div>
         </div>
        </div>
          </main>
      </div>
  )
}