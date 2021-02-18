import React, { useContext } from 'react';
import travlrsApi from '../../utils/travlrsApi';
import { useHistory } from 'react-router-dom';
import { CardsContext } from '../CardsContext/CardsContext';
import { useSelector } from 'react-redux';

const Card = ({ cardInfo: { name, link, likes, owner, _id }, onBasketClick }) => {
  const {
    userInfo: { userId },
  } = useSelector(({ app }) => app);
  const history = useHistory();
  const setCards = useContext(CardsContext);
  const isLiked = likes.some((like) => like._id === userId);
  const isUsersCard = userId === owner._id;

  //   const likesNames = newLikes.reduce((acc, cur, i)=>{
  //     return acc += i === 0 ? cur.name : `, ${cur.name}`
  //   }, '')

  const handleLike = (cardId, like) => {
    travlrsApi.changeLikeCardStatus(cardId, like).then((res) => {
      setCards((cards) => {
        const newCards = JSON.parse(JSON.stringify(cards));
        const card = newCards.find(({ _id }) => _id === res._id);
        card.likes = [...res.likes];
        return newCards;
      });
    });
  };

  return (
    <li className='places__item card'>
      <div
        onClick={() => history.push(`${_id}`)}
        className='card__image'
        style={{ backgroundImage: `url(${link})` }}
      ></div>
      <div className='card__image-blur' style={{ backgroundImage: `url(${link})` }}></div>

      {isUsersCard && (
        <button type='button' className='card__delete-button' onClick={onBasketClick}></button>
      )}
      <div className='card__description'>
        <h2 className='card__title'>{name}</h2>
        <div className='card__likes'>
          <button
            type='button'
            className={`card__like-button ${isLiked ? 'card__like-button_is-active ' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              handleLike(_id, !isLiked);
            }}
          ></button>
          <p className='card__like-count'>{likes.length || 0}</p>
        </div>
      </div>
    </li>
  );
};

export default Card;
