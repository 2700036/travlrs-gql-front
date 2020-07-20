import React from 'react';

const Card = ({cardInfo: {name, link, likes, _id}, onCardClick, onBasketClick, onLikeButton, isUsersCard, isLiked}) => {
  // const [isLiked, setIsLiked] = React.useState(false)  
  const classNames = isLiked ? 'card__like-button card__like-button_is-active' : 'card__like-button';
  
  return (
  <li onClick={onCardClick} className="places__item card">
    <div className="card__image" style={{backgroundImage: `url(${link})`}}>
    </div>
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
          onLikeButton(isLiked)}}
        ></button>
  <p className="card__like-count">{likes.length || 0}</p>
      </div>
    </div>
  </li>
  )
};



export default Card;




