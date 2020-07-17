import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from '../ImagePopup/ImagePopup';
import Card from '../Card/Card';
import api from '../../utils/api';
import EditForm from '../EditForm/EditForm';
import PlaceForm from '../PlaceForm/PlaceForm';


const Main = ({onEditProfile, onAddPlace, onEditAvatar, openState, onClose, card, handleCardClick}) => {
  const [userInfo, setUserInfo] = React.useState({    
    userName: '', 
    userDescription: '',
    userAvatar: ''        
  });

  const [cards, setCards] = React.useState([]);
  React.useEffect(()=>{
    Promise.all([api.getUserInfo(), api.getCardList()])
    .then(res =>{ 
      setUserInfo({
        userName: res[0].name, 
        userDescription: res[0].about,
        userAvatar: res[0].avatar,        
      });
      setCards(res[1]);
     
    })
    .catch(err =>{
      console.log(err)
    })
  }, [])  

  let curId = 100;

  
  const cardsElems = cards.map((card)=>{     
    const {_id} = card
    return <Card 
    cardInfo={card}
    onCardClick={()=>handleCardClick(card)}
    key={card.name+curId++}
    />
  });

  const onAddCardSubmit = ({name, link}) => {    
    setCards([...cards, {name, link}])
  }

  const {userName, userDescription, userAvatar} = userInfo;
  
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
  <PopupWithForm
  title='Редактировать профиль'
  name='edit'
  isOpen={openState.isEditProfilePopupOpen}
  onClose={onClose}
  
  >
  <EditForm />
  </PopupWithForm>
  
  <PopupWithForm
  title='Новое место'
  name='new-card'
  isOpen={openState.isAddPlacePopupOpen}
  onClose={onClose}
  >
  <PlaceForm onAddCardSubmit={onAddCardSubmit}/>    
  </PopupWithForm>

  <PopupWithForm
  title='Вы уверены?'
  name='remove-card'  
  >
      <form className="popup__form" name="remove-card" noValidate>
        <button type="submit" className="button popup__button">Да</button>
      </form>
  </PopupWithForm>

  <PopupWithForm
  title='Обновить аватар'
  name='edit-avatar'
  isOpen={openState.isEditAvatarPopupOpen}
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
  <ImagePopup 
  card={card}
  onClose={onClose}
  />    
  
  </>
    );
  
}

export default Main;