export function getUser(userId){
  const token = localStorage.getItem("token")
  return fetch(process.env.REACT_APP_API_URL + "/users/" + userId, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}` // sending this, I am authorized to get the user
    }
  })
 .then((response) => {return response.json()})
}

export function getUsers(){
  return fetch(process.env.REACT_APP_API_URL + "/users",
  {method: "GET"}
  ).then((response) => {return response.json()})
}

export function removeUser(userId, token){
  console.log(userId)
  return fetch(process.env.REACT_APP_API_URL + "/users/delete/" + userId, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}` // sending this, I am authorized to get the user
    }
  })
 .then((response) => {return response.json()})
}

export function updateUser(userId, user, token){
  console.log("user data update: ", user)
  return fetch(process.env.REACT_APP_API_URL + "/users/edit/" + userId, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}` // sending this, I am authorized to get the user
    },
    body: user
  })
  .then((response) => {return response.json()})
  .catch(err => console.log(err)) 
}