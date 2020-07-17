/* eslint-disable default-case */
import React from 'react';

const PlaceForm = ({onAddCardSubmit}) => {
    const [inputs, setInputs] = React.useState({name: '', link: ''})
    const onNameInput = (e) => {
        setInputs({...inputs, name: e.target.value})       
    }
    const onUrlInput = (e) => {
        setInputs({...inputs, link: e.target.value}) 
     }
     const onSubmit = (e) => {
         e.preventDefault();
         onAddCardSubmit(inputs)
     }
   
    return (
                <form className="popup__form" name="new-card" noValidate>
        <label className="popup__label">
          <input type="text" name="name" id="place-name"
                 className="popup__input popup__input_type_card-name" placeholder="Название"
                 required minLength="1" maxLength="30"
                 onChange={onNameInput}
                 />
          <span className="popup__error" id="place-name-error"></span>
        </label>
        <label className="popup__label">
          <input type="url" name="link" id="place-link"
                 className="popup__input popup__input_type_url" placeholder="Ссылка на картинку"
                 required
                 onChange={onUrlInput}
                 />
          <span className="popup__error" id="place-link-error"></span>
        </label>
        <button type="submit" className="button popup__button popup__button_disabled"
        onClick={onSubmit}
        >Сохранить</button>
      </form>
    )
}

export default PlaceForm;