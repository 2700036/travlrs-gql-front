import React from "react";
import { Route, Redirect } from "react-router-dom";
import Spinner from "../Spinner/Spinner";


export default (Wrapped) => {
  return ({path, loggedIn, ...props }) => {
    return <Route path={path}>
  {loggedIn ? <Wrapped {...props} /> : <Spinner />} 
  </Route>
  }  
}
