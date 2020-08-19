import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ImagePopup from '../ImagePopup/ImagePopup';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import EditForm from '../EditForm/EditForm';
import PlaceForm from '../PlaceForm/PlaceForm';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {CurrentUserContext} from './../currentUserContext/CurrentUserContext';
import api from './../../utils/api';


const App = () => {
  const [openedPopup, setOpenedPopup] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [userInfo, setUserInfo] = React.useState({
    userName: "",
    userDescription: "",
    userAvatar: "",
    userId: ""
  });
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCardList()])
      .then(res => {
        const [{ name, about, avatar, _id }, cardsData] = res;
        
        setUserInfo({
          userName: name,
          userDescription: about,
          userAvatar: avatar,
          userId: _id
        });
        setCards(cardsData);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const onDeleteCardSubmit = e => {
    e.preventDefault();
    api
      .removeCard(selectedCard._id)
      .then(res => {
        const ind = cards.findIndex(el => el._id === selectedCard._id);
        setCards([...cards.slice(0, ind), ...cards.slice(ind + 1)]);
        closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onAddCardSubmit = ({ name, link }) => {
    api.addCard({ name, link }).then(card => {
      setCards([...cards, card]);
      closeAllPopups();
    });
  };

  const handleEditAvatarClick = () => {
    setOpenedPopup({ isEditAvatarPopupOpen: true });
  };
  const handleEditProfileClick = () => {
    setOpenedPopup({ isEditProfilePopupOpen: true });
  };
  const handleAddPlaceClick = () => {
    setOpenedPopup({ isAddPlacePopupOpen: true });
  };
  const handleBasketIconClick = card => {
    setSelectedCard(card);
    setOpenedPopup({ isDeleteCardPopupOpened: true });
  };
  const closeAllPopups = () => {
    setOpenedPopup({});
    setSelectedCard(false);
  };
  const handleEditSubmit = (userInfo) =>{
    setUserInfo((info)=>{
      return {...info, ...userInfo}
    });
    closeAllPopups();
  }

  return (
    <CurrentUserContext.Provider value={userInfo}>
    <Router>
      <Header />
      <Main
        cards={cards}
        
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        handleBasketIconClick={handleBasketIconClick}
        onDeleteCardSubmit={onDeleteCardSubmit}
        onClose={closeAllPopups}
        onAddCardSubmit={onAddCardSubmit}
        openedPopup={openedPopup}
      />
      <Footer />

      {openedPopup.isEditProfilePopupOpen && <EditForm  
          title="Редактировать профиль"
          name="edit"
          onClose={closeAllPopups}
          onSubmit={handleEditSubmit}
        />      
      }

      {openedPopup.isAddPlacePopupOpen && (
        <PopupWithForm
          title="Новое место"
          name="new-card"
          onClose={closeAllPopups}
        >
          <PlaceForm onAddCardSubmit={onAddCardSubmit} />
        </PopupWithForm>
      )}

      {openedPopup.isDeleteCardPopupOpened && (
        <PopupWithForm
          title="Вы уверены?"
          name="remove-card"
          onClose={closeAllPopups}
        >
          <form className="popup__form" name="remove-card" noValidate>
            <button
              type="submit"
              className="button popup__button"
              onClick={onDeleteCardSubmit}
            >
              Да
            </button>
          </form>
        </PopupWithForm>
      )}

      {openedPopup.isEditAvatarPopupOpen && (
        <PopupWithForm
          title="Обновить аватар"
          name="edit-avatar"
          onClose={closeAllPopups}
        >
          <form className="popup__form" name="edit-avatar" noValidate>
            <label className="popup__label">
              <input
                type="url"
                name="avatar"
                id="owner-avatar"
                className="popup__input popup__input_type_description"
                placeholder="Ссылка на изображение"
                required
              />
              <span className="popup__error" id="owner-avatar-error"></span>
            </label>
            <button type="submit" className="button popup__button">
              Сохранить
            </button>
          </form>
        </PopupWithForm>
      )}

      <Route
        path="/:id"
        render={({ match, history }) => {
          const id = match.params.id;
          const currentCard = cards.find(({ _id }) => id === _id);
          return (
            currentCard && (
              <ImagePopup card={currentCard} onClose={() => history.goBack()} />
            )
          );
        }}
      />
    </Router>
    </CurrentUserContext.Provider>

  );
};

export default App;