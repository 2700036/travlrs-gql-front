import React, {useContext} from 'react';
import Card from '../Card/Card';
import {CurrentUserContext} from './../currentUserContext/CurrentUserContext';
import { Route, NavLink } from 'react-router-dom';
import FriendCard from '../FriendCard/FriendCard';


const Main = ({onEditProfile, onAddPlace, onEditAvatar, handleBasketIconClick, cards, users}) => {
  
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
  const friends = users.map((user)=>{  
    
    return <FriendCard 
    cardInfo={user}    
    key={user._id}    
    isUsersCard={userId===user._id}    
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
    <div className='tabs page__section'>
      <NavLink to='/cards/' className='tab' activeClassName='tab_active'>
      Места
      </NavLink>
      <NavLink to='/friends/' className='tab' activeClassName='tab_active'>
      Друзья
      </NavLink>
    </div>
    <section className="places page__section">
      <ul className="places__list">
        <Route exact path='/' render={()=>{
          return (
          <p style={{'marginTop': '100px'}} className='profile__title'>{`Добро пожаловать, ${userName}!`}</p>
          )
        }}/>
        <Route path='/cards/' render={()=>{
          return (
            cardsElems
          )
        }} /> 
        <Route path='/friends/' render={()=>{
          return (
            friends
          )
        }} />       
      </ul>
    </section>
  </main>  
  </>
    );
  
}

export default Main;