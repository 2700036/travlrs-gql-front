import React, { Component } from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import ImagePopup from '../ImagePopup/ImagePopup';

class Main extends Component {

  render() {
    const {onEditProfile, onAddPlace, onEditAvatar, openState, onClose} = this.props;
    return (
      <>
      <main className="content">
    <section className="profile page__section">
      <div 
      className="profile__image"
      onClick={onEditAvatar}
      ></div>
      <div className="profile__info">
        <h1 className="profile__title">Жак-Ив Кусто</h1>
        <button 
        className="profile__edit-button" 
        type="button"
        onClick={onEditProfile}
        ></button>
        <p className="profile__description">Исследователь океана</p>
      </div>
      <button 
      className="profile__add-button" 
      type="button"
      onClick={onAddPlace}
      ></button>
    </section>
    <section className="places page__section">
      <ul className="places__list">
      </ul>
    </section>
  </main>
  <PopupWithForm
  title='Редактировать профиль'
  name='edit'
  isOpen={openState.isEditProfilePopupOpen}
  onClose={onClose}
  
  >
  <form className="popup__form" name="edit" noValidate>
      <label className="popup__label">
        <input type="text" name="userName" id="owner-name"
               className="popup__input popup__input_type_name" placeholder="Имя"
               required minLength="2" maxLength="40" pattern="[a-zA-Zа-яА-Я -]{1,}"/>
        <span className="popup__error" id="owner-name-error"></span>
      </label>
      <label className="popup__label">
        <input type="text" name="userDescription" id="owner-description"
               className="popup__input popup__input_type_description" placeholder="Занятие"
               required minLength="2" maxLength="200"/>
        <span className="popup__error" id="owner-description-error"></span>
      </label>
      <button type="submit" className="button popup__button">Сохранить</button>
    </form>
  </PopupWithForm>
  
  <PopupWithForm
  title='Новое место'
  name='new-card'
  isOpen={openState.isAddPlacePopupOpen}
  onClose={onClose}
  >
      <form className="popup__form" name="new-card" noValidate>
        <label className="popup__label">
          <input type="text" name="name" id="place-name"
                 className="popup__input popup__input_type_card-name" placeholder="Название"
                 required minLength="1" maxLength="30"/>
          <span className="popup__error" id="place-name-error"></span>
        </label>
        <label className="popup__label">
          <input type="url" name="link" id="place-link"
                 className="popup__input popup__input_type_url" placeholder="Ссылка на картинку"
                 required/>
          <span className="popup__error" id="place-link-error"></span>
        </label>
        <button type="submit" className="button popup__button popup__button_disabled">Сохранить</button>
      </form>
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
  <ImagePopup />    
  
  </>
    );
  }
}

export default Main;