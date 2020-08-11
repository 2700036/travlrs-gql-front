import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from '../ImagePopup/ImagePopup';
import Card from '../Card/Card';
import api from '../../utils/api';
import EditForm from '../EditForm/EditForm';
import PlaceForm from '../PlaceForm/PlaceForm';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';



const Main = ({onEditProfile, onAddPlace, onEditAvatar, openedPopup, onClose, selectedCard, handleBasketIconClick}) => {
  
  
  const [userInfo, setUserInfo] = React.useState({    
    userName: '', 
    userDescription: '',
    userAvatar: '',
    userId: ''        
  });
  const {userName, userDescription, userAvatar, userId} = userInfo;

  const [cards, setCards] = React.useState([]);
  React.useEffect(()=>{
    Promise.all([api.getUserInfo(), api.getCardList()])
    .then(res =>{        
      const [{name, about, avatar, _id}, cardsData] = res;  
      console.log(cardsData); 
      setUserInfo({
        userName: name, 
        userDescription: about,
        userAvatar: avatar,
        userId: _id         
      });
      setCards(cardsData);
     
    })
    .catch(err =>{
      console.log(err)
    })
  }, []) 
  
  const onDeleteCardSubmit = (e)=>{
    e.preventDefault();
    api.removeCard(selectedCard._id)
    .then((res)=>{           
      const ind = cards.findIndex(el=>el._id === selectedCard._id);
      setCards([...cards.slice(0, ind), ...cards.slice(ind+1)]);
      onClose(); 
    }
    )
    .catch(err=>{console.log(err);})
  }
  const onLikeButton = (cardId, isliked) => {
    if(isliked){
      console.log('снимаем');
    } else {
      console.log('ставим');
    }
  }
  
  const onAddCardSubmit = ({name, link}) => {
    api.addCard({name, link})
    .then(card=>{
      setCards([...cards, card]);
      onClose();
    })    
    
  }
  
  const cardsElems = cards.map((card)=>{  
    const isLiked = card.likes.some(({_id})=>userId===_id);
    return <Card 
    cardInfo={card}
    onBasketClick={(e)=>{
      e.stopPropagation();
      handleBasketIconClick(card)
    }}
    key={card._id}
    onLikeButton={onLikeButton}
    isUsersCard={userId===card.owner._id}
    isInitialLiked={isLiked}
    />
  });
  
  
    return (
      <Router>
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
  {openedPopup.isEditProfilePopupOpen && <PopupWithForm
  title='Редактировать профиль'
  name='edit'
  
  onClose={onClose}
  
  >
  {userInfo.userName && <EditForm 
  initialUserInfo={userInfo}
  />}
  </PopupWithForm>
}
  {openedPopup.isAddPlacePopupOpen && <PopupWithForm
  title='Новое место'
  name='new-card'
  
  onClose={onClose}
  >
  <PlaceForm onAddCardSubmit={onAddCardSubmit}/>    
  </PopupWithForm>
}
{openedPopup.isDeleteCardPopupOpened && <PopupWithForm
  title='Вы уверены?'
  name='remove-card'
  
  onClose={onClose} 
  >
      <form className="popup__form" name="remove-card" noValidate>
        <button type="submit" className="button popup__button"
        onClick={onDeleteCardSubmit}
        >Да</button>
      </form>
  </PopupWithForm>
}
{openedPopup.isEditAvatarPopupOpen && <PopupWithForm
  title='Обновить аватар'
  name='edit-avatar'
  
  onClose={onClose}
  >
      <form className="popup__form" name="edit-avatar" noValidate>
        <label className="popup__label">
          <input type="url" name="avatar" id="owner-avatar"
                 className="popup__input popup__input_type_description" placeholder="Ссылка на изображение"
                 required/>
          <span className="popup__error" id="owner-avatar-error"></span>
        </label>
        <button type="submit" className="button popup__button">Сохранить</button>
      </form>
  </PopupWithForm>
}
  <Route path='/places/:id' render={({match, history})=>{
    const id = match.params.id;
    const currentCard = cards.find(({_id})=>id === _id)
    return (currentCard &&
      <ImagePopup 
  card={currentCard}  
  onClose={()=>history.goBack()}
  />  
    )
  }} />
    
  
  </Router>
    );
  
}

export default Main;