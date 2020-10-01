export const BASE_URL = "https://travlrsapi.herokuapp.com";

export const register = (email, password, name) => {
  console.log({email, password, name})
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email, password, name})
  })
    .then((response) => {
      return response.json();
    })
    .then((res) => {
      return res;
    })
    .catch((err) => console.log(err));
};
export const authorize = (email, password) => {
  console.log(email, password)
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
    .then((response) => response.json())
    .then((data) => {           
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      } else {
        return data;
      }
    })
    .catch((err) => {
      console.log(err);
      
    });
};
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .then(res=>{
      if(!res.message){
        return res
      };
      throw res.message 
    })
    .catch((err)=>{
      console.log(err);
      throw err
    })
};
