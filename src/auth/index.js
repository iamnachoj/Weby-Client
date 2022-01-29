export function signup(user) {
  return fetch(process.env.REACT_APP_API_URL + "/signup", {
    method: "POST",
    headers: {
      Accept: "application/JSON",
      "Content-Type": "application/JSON"
    },
    body: JSON.stringify(user)
  })
  .then((response) => {return response.json()})
  .catch(err => console.log(err))
}

export function signin(user) {
  return fetch(process.env.REACT_APP_API_URL + "/signin", {
    method: "POST",
    headers: {
      Accept: "application/JSON",
      "Content-Type": "application/JSON"
    },
    body: JSON.stringify(user)
  })
  .then((response) => {return response.json()})
  .catch(err => console.log(err))
}
export function signout(next) {
  if(typeof window !== undefined){
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    next();
    return fetch(process.env.REACT_APP_API_URL + "/signout", {
      method: "GET"
    })
     .then(res => {
       console.log(res.status)
       return res.json()
     })
     .catch(err => console.log(err))
  }
}
export function isAuthenticated(){
  if(typeof window == undefined){
    return false
  }
  if(localStorage.getItem("token")){
    return localStorage.getItem("user")
  } else{ return false }
}