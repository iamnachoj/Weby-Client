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