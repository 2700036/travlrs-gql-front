import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ImagePopup from '../ImagePopup/ImagePopup';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import EditForm from '../EditForm/EditForm';
import PlaceForm from '../PlaceForm/PlaceForm';
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { CurrentUserContext } from './../currentUserContext/CurrentUserContext';
import api from './../../utils/api';
import './app.css';
import { CardsContext } from '../CardsContext/CardsContext';
import EditAvatar from '../EditAvatar/EditAvatar';
import Spinner from '../Spinner/Spinner';
import Login from '../Login/Login';
import Register from '../Register/Register';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import * as auth from '../auth';
import { useActions } from '../../reducers/useActions';
import { useSelector } from 'react-redux';

const App = ({ history }) => {
  const { loggedIn, authStatus, userInfo, openedPopup, selectedCard } = useSelector(({ app }) => app);
  const {
    updateUserInfo,
    logIn,
    updateAuthStatus,
    openEditProfilePopup,
    openAddPlacePopup,
    openEditAvatarPopup,
    openDeleteCardConfirmPopup,
    closePopups,
  } = useActions();

  const [cards, setCards] = React.useState([]);
  const [users, setUsers] = React.useState([]);

  const loginCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth
        .checkToken(jwt)
        .then((res) => {
          updateUserInfo({
            userName: res.name,
            userDescription: res.about,
            userAvatar: res.avatar,
            userId: res._id,
            userEmail: res.email,
          });
          logIn();
          Promise.all([api.getCardList(), api.getUsers()])
            .then((res) => {
              const [cardsData, users] = res;
              setCards(cardsData);
              setUsers(users);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
          updateAuthStatus({ message: err });
        });
    } else {
      history.push('/login')
    }
  };

  React.useEffect(() => {
    loginCheck();
  }, [loggedIn]);

  const onDeleteCardSubmit = (e) => {
    e.preventDefault();
    api
      .removeCard(selectedCard._id)
      .then((res) => {
        const ind = cards.findIndex((el) => el._id === selectedCard._id);
        setCards([...cards.slice(0, ind), ...cards.slice(ind + 1)]);
        closePopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onAddCardSubmit = ({ name, link }) => {
    api
      .addCard({ name, link })
      .then((card) => {
        console.log(card);
        setCards([card, ...cards]);
        closePopups();
      })
      .catch((err) => {
        updateAuthStatus({ message: 'Что-то пошло не так...' });
        console.log(err);
      });
  };

 

  const handleEditSubmit = (userInfo) => {
    api.setUserInfo(userInfo).then(({ name, about }) => {
      // const user = JSON.parse( localStorage.user );
      // user.name = userInfo.name;
      // user.about = userInfo.about;
      // localStorage.setItem('user', JSON.stringify(user))
      updateUserInfo({ userName: name, userDescription: about });
      closePopups();
    });
  };

  const onAvatarEditSubmit = (url) => {
    api.setUserAvatar(url).then(({ avatar }) => {
      // const user = JSON.parse( localStorage.user );
      // user.avatar = url.avatar;
      // localStorage.setItem('user', JSON.stringify(user))
      updateUserInfo({ userAvatar: avatar });
      closePopups();
    });
  };

  return (
    <CurrentUserContext.Provider value={userInfo}>
      <CardsContext.Provider value={setCards}>
        <Header isLoggedIn={loggedIn} userEmail={userInfo?.userEmail} />
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />            
          <Route path='/' >
            {loggedIn && userInfo ? (
              <Main                
                loggedIn={loggedIn}
                cards={cards}
                users={users}
                onEditProfile={openEditProfilePopup}
                onAddPlace={openAddPlacePopup}
                onEditAvatar={openEditAvatarPopup}
                handleBasketIconClick={openDeleteCardConfirmPopup}
                onDeleteCardSubmit={onDeleteCardSubmit}
                onClose={closePopups}
                onAddCardSubmit={onAddCardSubmit}
                openedPopup={openedPopup}
              />
            ) : (
              <Redirect to='/login' />
            )}
          </Route>
        </Switch>
        <Footer />
        <Route
          path='/cards/:id'
          render={({ match, history }) => {
            const id = match.params.id;
            const currentCard = cards.find(({ _id }) => id === _id);
            console.log(currentCard);
            return (
              (currentCard && <ImagePopup card={currentCard} onClose={() => history.push('/cards/')} />) || (
                <Spinner />
              )
            );
          }}
        />
        <Route
          path='/friends/:id'
          render={({ match, history }) => {
            const id = match.params.id;
            const currentUser = users.find(({ _id }) => id === _id);
            return (
              (currentUser && (
                <ImagePopup card={currentUser} onClose={() => history.push('/friends/')} />
              )) || <Spinner />
            );
          }}
        />
        <Route
          path='/favorite/:id'
          render={({ match, history }) => {
            const id = match.params.id;
            const currentCard = cards.find(({ _id }) => id === _id);
            return (
              (currentCard && (
                <ImagePopup card={currentCard} onClose={() => history.push('/favorite/')} />
              )) || <Spinner />
            );
          }}
        />

        {openedPopup.isEditProfilePopupOpen && (
          <EditForm
            title='Редактировать профиль'
            name='edit'
            onClose={closePopups}
            onSubmit={handleEditSubmit}
          />
        )}
        {openedPopup.isLoginStatusPopupOpen && (
          <InfoTooltip onClose={closePopups} name='tooltip' status={authStatus} />
        )}

        {openedPopup.isAddPlacePopupOpen && (
          <PopupWithForm title='Предложить место' name='new-card' onClose={closePopups}>
            <PlaceForm onAddCardSubmit={onAddCardSubmit} />
          </PopupWithForm>
        )}

        {openedPopup.isDeleteCardPopupOpened && (
          <PopupWithForm title='Вы уверены?' name='remove-card' onClose={closePopups}>
            <form className='popup__form' name='remove-card' noValidate>
              <button type='submit' className='button popup__button' onClick={onDeleteCardSubmit}>
                Да
              </button>
            </form>
          </PopupWithForm>
        )}

        {openedPopup.isEditAvatarPopupOpen && (
          <PopupWithForm title='Обновить аватар' name='edit-avatar' onClose={closePopups}>
            <EditAvatar onAvatarEditSubmit={onAvatarEditSubmit} />
          </PopupWithForm>
        )}
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default withRouter(App);

// //! Обнуление данных пользователей от дураков.
// function currentSession(){
//   if(localStorage.user){
//     const { name, about, avatar, _id } = JSON.parse(localStorage.user);
//     return Promise.all([api.getCardList(), api.getUsers()])
//     .then(res => {
//       const [cardsData, users] = res;
//     return [{ name, about, avatar, _id }, cardsData, users]})
//   } else {
//     return api.setUserInfo({name: 'Серёга Бирюков', about: 'Бэкпэкер и каучсёрфер'})
//     .then(()=>{
//       return api.setUserAvatar({avatar: 'https://sun9-4.userapi.com/w-Ge9P349j4ZVTXd2Zh2J0Prj8yAfhZ6l2Y8YQ/NTw6lM-rdKg.jpg'})
//       .then(()=>{
//         return Promise.all([api.getUserInfo(), api.getCardList(), api.getUsers()])
//       .then(res => {
//         localStorage.setItem('user' , JSON.stringify(res[0]))
//         return res})
//       })
//     })
//   }
// }
