import React from 'react';
import api from '../../utils/api';
import { Link } from 'react-router-dom';


const Card = ({cardInfo: {name, link, likes, _id}, onCardClick, onBasketClick, isUsersCard, isInitialLiked}) => {
  const [isLiked, setIsLiked] = React.useState(isInitialLiked)
  const [likesLength, setLikesLength] = React.useState(likes.length)  

  const handleLike = (cardId, like) => {
    api.changeLikeCardStatus(cardId, like)
    .then(res=>{      
      setLikesLength(res.likes.length);
      setIsLiked(!isLiked);      
    })    
    }  
  
  const classNames = isLiked ? 'card__like-button card__like-button_is-active' : 'card__like-button';
  return (
  <li className="places__item card">
    <Link to={`/places/${_id}`}>
    <div className="card__image" style={{backgroundImage: `url(${link})`}}>
    </div>
    </Link>
    {isUsersCard && <button type="button" className="card__delete-button"
    onClick={onBasketClick}
  ></button>}    
    <div className="card__description">
      <h2 className="card__title">
        {name}
      </h2>
      <div className="card__likes">
        <button type="button" 
        className={classNames}
        onClick={(e)=>{
          e.stopPropagation();
          handleLike(_id, !isLiked)}}
        ></button>
  <p className="card__like-count">{likesLength || 0}</p>
      </div>
    </div>
  </li>
  )
};



export default Card;




