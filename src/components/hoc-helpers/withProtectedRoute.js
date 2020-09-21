import React from "react";
import { Route, Redirect } from "react-router-dom";

export default (Wrapped) => {
  return ({path, loggedIn, ...props }) => {
    return <Route path={path}>
  {loggedIn ? <Wrapped {...props} /> : <Redirect to='/login'/>}
  </Route>
  }  
}
