import { useState } from "react/cjs/react.development"
export default function Comment(){
  const [comment, setComment] = useState({text: ""})
  const [wantsToComment, setWantsToComment ] = useState(false)

  function handleChange(event){
    let value = event.target.value;
    setComment(value)
  }

  function clickSubmit(event){
    event.preventDefault();
    
  }
  return (
    <div>
      {wantsToComment 
        ?  <form className="mt-4">
              <div className="form-group">
                <textarea placeholder="add a comment..." onChange={handleChange} value={comment.text} name="text" type="text" className="form-control" />
                <button onClick={clickSubmit} className="btn btn-sm btn-primary mt-2 ml-0">Add Comment</button>
              </div>  
              <button onClick={() => {setWantsToComment(!wantsToComment)}}>hide comments</button>      
            </form> 
        : <button onClick={() => {setWantsToComment(!wantsToComment)}}>Comments</button>
      }
    </div>
  )
}