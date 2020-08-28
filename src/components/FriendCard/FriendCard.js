import React from 'react';

import { useHistory} from 'react-router-dom'


const FriendCard = ({cardInfo: {name, about, avatar, _id}}) => {
  const history = useHistory();
   
  return (
  <li className="places__item card">
    
    <div onClick={()=>history.push(`${_id}`)}
    className="card__image" style={{backgroundImage: `url(${avatar})`}}>
    </div>
    <div 
    className="card__image-blur" style={{backgroundImage: `url(${avatar})`}}>
    </div>
      
    <div className="card__friend-description">
      <h2 className="card__title">
        {name}
      </h2>
      <p className="card__about">
        {about}
      </p>
      
    </div>
  </li>
  )
};



export default FriendCard;