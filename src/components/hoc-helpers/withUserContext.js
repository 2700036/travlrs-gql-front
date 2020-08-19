import React, {useContext} from 'react'
import { CurrentUserContext } from '../currentUserContext/CurrentUserContext'

export default (Wrapped) => {
  return (props)=>{    
    const userContext = useContext(CurrentUserContext);
    return (
      <Wrapped {...props} userContext={userContext}/>
    )
  }
}