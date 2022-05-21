export function create(userId, token, post){
    return fetch(`${process.env.REACT_APP_API_URL}/posts/new/${userId}`, {
        method: "POST",
        headers: {
            Accept: "Application/json",
            Authorization: `Bearer ${token}`
        },
        body: post
    })
      .then(response => {
          return response.json()
      })
      .catch(err => console.log(err));
}

export function getPosts(){
    return fetch(process.env.REACT_APP_API_URL + "/posts",
    {method: "GET"}
    ).then((response) => {return response.json()})
  }

  export function getPost(postId){
    return fetch(process.env.REACT_APP_API_URL + "/posts/" + postId, {
      method: "GET"
    })
   .then((response) => {return response.json()})
  }

  export function getPostsByUser(userId, token){
    return fetch(process.env.REACT_APP_API_URL + "/posts/by/" + userId,
    {method: "GET",
     headers: {
        Accept: "Application/json",
        'Content-Type': "Application/json",
        Authorization: `Bearer ${token}`
      }}
    ).then((response) => {return response.json()})
  }

  export function removePost(postId, token){
    return fetch(process.env.REACT_APP_API_URL + "/posts/delete/" + postId, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}` // sending this, I am authorized to get the user
      }
    })
   .then((response) => {return response.json()})
  }

  export function updatePost(postId, post, token){
    console.log("post data update: ", post)
    return fetch(process.env.REACT_APP_API_URL + "/posts/edit/" + postId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}` // sending this, I am authorized to get the user
      },
      body: post
    })
    .then((response) => {
      if(response.error){
        console.log(response.error)
      }
       return response.json()})
    .catch(err => console.log(err)) 
  }
  

  export function like(userId, postId, token){
    return fetch(process.env.REACT_APP_API_URL + "/posts/like", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // sending this, I am authorized to get the user
      },
      body: JSON.stringify({userId, postId})
    })
    .then((response) => {
      if(response.error){
        console.log(response.error)
      }
       return response.json()})
    .catch(err => console.log(err)) 
  }

  export function unlike(userId, postId, token){
    return fetch(process.env.REACT_APP_API_URL + "/posts/unlike", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // sending this, I am authorized to get the user
      },
      body: JSON.stringify({userId, postId})
    })
    .then((response) => {
      if(response.error){
        console.log(response.error)
      }
       return response.json()})
    .catch(err => console.log(err)) 
  }
  