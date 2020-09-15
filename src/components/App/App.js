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
import './app.css';
import { CardsContext } from '../CardsContext/CardsContext';
import EditAvatar from '../EditAvatar/EditAvatar';
import Spinner from '../Spinner/Spinner';


//! Обнуление данных пользователей от дураков.
const currentSession = () => { 
  if(localStorage.user){
    const { name, about, avatar, _id } = JSON.parse(localStorage.user);
    console.log(name, about, avatar, _id)
    return Promise.all([api.getCardList(), api.getUsers()])
    .then(res => {
      const [cardsData, users] = res;
    return [{ name, about, avatar, _id }, cardsData, users]})
  } else {    
    return api.setUserInfo({name: 'Серёга Бирюков', about: 'Бэкпэкер и каучсёрфер'})
    .then(()=>{
      return api.setUserAvatar({avatar: 'https://sun9-4.userapi.com/w-Ge9P349j4ZVTXd2Zh2J0Prj8yAfhZ6l2Y8YQ/NTw6lM-rdKg.jpg'})
      .then(()=>{
        return Promise.all([api.getUserInfo(), api.getCardList(), api.getUsers()])
      .then(res => {      
        localStorage.setItem('user' , JSON.stringify(res[0]))
        return res})
      }) 
    })
     
  }  
}

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
  const [users, setUsers] = React.useState([]);


  React.useEffect(() => {
    currentSession()
        .then(res => {
          const [{ name, about, avatar, _id }, cardsData, users] = res;
        setUserInfo({
          userName: name,
          userDescription: about,
          userAvatar: avatar,
          userId: _id
        });
        setCards(cardsData);
        setUsers(users)
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
    api.setUserInfo(userInfo)
    .then(({name, about}) =>{
      const user = JSON.parse( localStorage.user );
      user.name = userInfo.name;
      user.about = userInfo.about;
      localStorage.setItem('user', JSON.stringify(user))
      setUserInfo((info)=>{
        return {...info, userName: name,
          userDescription: about}
        });
    closeAllPopups()
  })    
  }

  const onAvatarEditSubmit = (url) => {    
    api.setUserAvatar(url)
    .then(({avatar}) =>{
      const user = JSON.parse( localStorage.user );
      user.avatar = url.avatar;      
      localStorage.setItem('user', JSON.stringify(user))
      setUserInfo((info)=>{
      return {...info, userAvatar: avatar}
    });
    closeAllPopups()
  })   
  }

  return (
    <CurrentUserContext.Provider value={userInfo}>
      <CardsContext.Provider value={setCards}>
    <Router>
      <Header />
      {
      (cards.length && <Main
        cards={cards}
        users={users}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        handleBasketIconClick={handleBasketIconClick}
        onDeleteCardSubmit={onDeleteCardSubmit}
        onClose={closeAllPopups}
        onAddCardSubmit={onAddCardSubmit}
        openedPopup={openedPopup}
      />) ||
       <Spinner/>}
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
          title="Предложить место"
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
         <EditAvatar onAvatarEditSubmit={onAvatarEditSubmit}/>
        </PopupWithForm>
      )}

      <Route
        path="/cards/:id"
        render={({ match, history }) => {
          const id = match.params.id;
          const currentCard = cards.find(({ _id }) => id === _id);
          return (
            currentCard && <ImagePopup 
            card={currentCard} 
            onClose={()=>history.push('/cards/')}  
            />
            
          );
        }}
      />
      <Route
        path="/friends/:id"
        render={({ match, history }) => {
          const id = match.params.id;
          const currentUser = users.find(({ _id }) => id === _id);
          console.log(currentUser)
          return (
            currentUser && <ImagePopup 
            card={currentUser} 
            onClose={()=>history.push('/friends/')}  
            />
            
          );
        }}
      />
    </Router>
    </CardsContext.Provider>
    </CurrentUserContext.Provider>

  );
};

export default App;