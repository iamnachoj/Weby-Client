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