import React, { useState, useContext } from 'react';
import api from '../../utils/api';
import { useHistory } from 'react-router-dom'
import { CardsContext } from '../CardsContext/CardsContext';


const Card = ({cardInfo: {name, link, likes, _id}, onBasketClick, isUsersCard, isInitialLiked, userId}) => {
  const history = useHistory();
  const setCards = useContext(CardsContext);
  const [isLiked, setIsLiked] = useState(isInitialLiked)
  const [likesLength, setLikesLength] = useState(likes.length);
  const [newLikes, setNewLikes] = useState(likes);

//   const likesNames = newLikes.reduce((acc, cur, i)=>{    
//     return acc += i === 0 ? cur.name : `, ${cur.name}`
//   }, '') 
// console.log(likesNames)

  const handleLike = (cardId, like) => {
    api.changeLikeCardStatus(cardId, like)
    .then(res=>{      
      setLikesLength(res.likes.length);
      setIsLiked(!isLiked); 
      setCards(cards=>{
        const newCards = JSON.parse(JSON.stringify(cards));        
        const card = newCards.find(({_id})=>_id===res._id);
        card.likes = [...res.likes];
        return newCards
      })    
    })    
    }  
  
 
  return (
  <li className="places__item card">
    
    <div onClick={()=>history.push(`${_id}`)}
    className="card__image" style={{backgroundImage: `url(${link})`}}>
    </div>
    <div 
    className="card__image-blur" style={{backgroundImage: `url(${link})`}}>
    </div>
    
    
    {_id!=='5e690ffa69fae7001f72a55f' && isUsersCard && <button type="button" className="card__delete-button"
    onClick={onBasketClick}
  ></button>}    
    <div className="card__description">
      <h2 className="card__title">
        {name}
      </h2>
      <div className="card__likes">
        <button type="button" 
        className={`card__like-button ${isLiked ? 'card__like-button_is-active ' : ''}`}
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




