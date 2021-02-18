import React from 'react';
import Card from '../Card/Card';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import EditForm from '../EditForm/EditForm';
import PlaceForm from '../PlaceForm/PlaceForm';
import EditAvatar from '../EditAvatar/EditAvatar';
import { Route, NavLink } from 'react-router-dom';
import FriendCard from '../FriendCard/FriendCard';
import WelcomeScreen from '../WelcomeScreen/WelcomeScreen';
import { useSelector } from 'react-redux';
import { useActions } from '../../reducers/useActions';
import travlrsApi from '../../utils/travlrsApi';

const Main = ({ onAddCardSubmit, onDeleteCardSubmit }) => {
  const {
    userInfo: { userName, userDescription, userAvatar, userId },
    openedPopup,
  } = useSelector(({ app }) => app);
  const { cards, users } = useSelector(({ cards }) => cards);
  
  const {
    openEditProfilePopup,
    openAddPlacePopup,
    openEditAvatarPopup,
    openDeleteCardConfirmPopup,
    closePopups,
    updateUserInfo,
  } = useActions();

  const handleEditSubmit = (userInfo) => {
    travlrsApi.setUserInfo(userInfo).then(({ name, about }) => {
      updateUserInfo({ userName: name, userDescription: about });
      closePopups();
    });
  };

  const onAvatarEditSubmit = (url) => {
    travlrsApi.setUserAvatar(url).then(({ avatar }) => {
      updateUserInfo({ userAvatar: avatar });
      closePopups();
    });
  };

  const makeListOfElements = (elements) => {
    return elements.map((card) => {
      const isLiked = card.likes.some(({ _id }) => userId === _id);
      return (
        <Card
          
          cardInfo={card}
          onBasketClick={(e) => {
            e.stopPropagation();
            openDeleteCardConfirmPopup(card);
          }}
          key={card._id}
          
          
        />
      );
    });
  };

  const sortedFavorites = cards
    .filter((card) => card.likes.some(({ _id }) => userId === _id))
    .sort((a, b) => {
      return b.likes.length - a.likes.length;
    });    
  const cardsElems = makeListOfElements(cards);
  const favorites = makeListOfElements(sortedFavorites);
  const friends = users.map((user) => {
    return <FriendCard cardInfo={user} key={user._id} isUsersCard={userId === user._id} />;
  });

  return (
    <>
      <main className='content'>
        <section className='profile page__section'>
          <div
            className='profile__image'
            onClick={openEditAvatarPopup}
            style={{ backgroundImage: `url(${userAvatar})` }}
          ></div>
          <div className='profile__info'>
            <h1 className='profile__title'>{userName}</h1>
            <button className='profile__edit-button' type='button' onClick={openEditProfilePopup}></button>
            <p className='profile__description'>{userDescription}</p>
          </div>
          <button className='profile__add-button' type='button' onClick={openAddPlacePopup}></button>
        </section>
        <div className='tabs page__section'>
          <NavLink to='/cards/' className='tab' activeClassName='tab_active'>
            Места
          </NavLink>
          <NavLink to='/friends/' className='tab' activeClassName='tab_active'>
            Друзья
          </NavLink>
          <NavLink
            style={{ marginLeft: 'auto' }}
            to='/favorite/'
            className='tab'
            activeClassName='tab_active'
          >
            <div className={`card__like-button card__like-button_is-active`}></div>
          </NavLink>
        </div>
        <section className='places page__section'>
          <Route exact path='/' render={WelcomeScreen} />
          <ul className='places__list'>
            <Route
              path='/cards/'
              render={() => {
                return cardsElems;
              }}
            />
            <Route
              path='/friends/'
              render={() => {
                return friends;
              }}
            />
            <Route
              path='/favorite/'
              render={() => {
                return favorites;
              }}
            />
          </ul>
        </section>
      </main>
      {openedPopup.isEditProfilePopupOpen && (
        <EditForm
          title='Редактировать профиль'
          name='edit'
          onClose={closePopups}
          onSubmit={handleEditSubmit}
        />
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
      ;
      {openedPopup.isEditAvatarPopupOpen && (
        <PopupWithForm title='Обновить аватар' name='edit-avatar' onClose={closePopups}>
          <EditAvatar onAvatarEditSubmit={onAvatarEditSubmit} />
        </PopupWithForm>
      )}
    </>
  );
};

export default Main;
