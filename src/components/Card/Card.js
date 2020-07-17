import React from 'react';

const Card = ({cardInfo: {name, link, likes = 0}, onCardClick}) => {  
  
  return (
  <li onClick={onCardClick} className="places__item card">
    <div className="card__image" style={{backgroundImage: `url(${link})`}}>
    </div>
    <button type="button" className="card__delete-button"></button>    
    <div className="card__description">
      <h2 className="card__title">
        {name}
      </h2>
      <div className="card__likes">
        <button type="button" className="card__like-button"></button>
  <p className="card__like-count">{likes.length || 0}</p>
      </div>
    </div>
  </li>
  )
};



export default Card;




