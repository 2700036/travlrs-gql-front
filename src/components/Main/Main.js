import React, {useContext} from 'react';
import Card from '../Card/Card';
import {CurrentUserContext} from './../currentUserContext/CurrentUserContext';

const Main = ({onEditProfile, onAddPlace, onEditAvatar, handleBasketIconClick, cards}) => {
  
  const {userName, userDescription, userAvatar, userId} = useContext(CurrentUserContext);
  

  const cardsElems = cards.map((card)=>{  
    const isLiked = card.likes.some(({_id})=>userId===_id);
    return <Card 
    cardInfo={card}
    onBasketClick={(e)=>{
      e.stopPropagation();
      handleBasketIconClick(card)
    }}
    key={card._id}    
    isUsersCard={userId===card.owner._id}
    isInitialLiked={isLiked}
    />
  });  
  
    return (
     <>
      <main className="content">
    <section className="profile page__section">
      <div 
      className="profile__image"
      onClick={onEditAvatar}
      style={{backgroundImage: `url(${userAvatar})`}}
      ></div>
      <div className="profile__info">
        <h1 className="profile__title">{userName}</h1>
        <button 
        className="profile__edit-button" 
        type="button"
        onClick={onEditProfile}
        ></button>
        <p className="profile__description">{userDescription}</p>
      </div>
      <button 
      className="profile__add-button" 
      type="button"
      onClick={onAddPlace}
      ></button>
    </section>
    <section className="places page__section">
      <ul className="places__list">
        {cardsElems}
      </ul>
    </section>
  </main>  
  </>
    );
  
}

export default Main;