import React, {useContext} from 'react';
import Card from '../Card/Card';
import {CurrentUserContext} from './../currentUserContext/CurrentUserContext';
import { Route, NavLink } from 'react-router-dom';
import FriendCard from '../FriendCard/FriendCard';
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';
import withProtectedRoute from '../hoc-helpers/withProtectedRoute';


const Main = ({onEditProfile, onAddPlace, onEditAvatar, handleBasketIconClick, cards, users}) => {
  
  const {userName, userDescription, userAvatar, userId} = useContext(CurrentUserContext);
  

  const cardsElems = cards.map((card)=>{ 
     
    const isLiked = card.likes.some(({_id})=>userId===_id);
    return <Card 
    userId={userId}
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
  const sortFavorites = cards.filter((card)=>card.likes.some(({_id})=>userId===_id)).sort((a,b)=>{    
    return b.likes.length - a.likes.length
  });
  
  const favorites = sortFavorites.map((card)=>{  
      const isLiked = card.likes.some(({_id})=>userId===_id);
      return <Card 
      userId={userId}
      cardInfo={card}
      onBasketClick={(e)=>{
        e.stopPropagation();
        handleBasketIconClick(card)
      }}
      key={card._id}    
      isUsersCard={userId===card.owner._id}
      isInitialLiked={isLiked}
      />
    })
  
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
      <NavLink style={{'marginLeft': 'auto'}} to='/favorite/' className='tab' activeClassName='tab_active'>
      <div className={`card__like-button card__like-button_is-active`}></div>
      </NavLink>
    </div>
    <section className="places page__section">
        <Route exact path='/' render={WelcomeScreen}/>
      <ul className="places__list">
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
        <Route path='/favorite/' render={()=>{
          return (
            favorites
          )
        }} />       
      </ul>
    </section>
  </main>  
  </>
    );
  
}

export default withProtectedRoute(Main);
