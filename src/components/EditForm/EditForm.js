import React from 'react';
import withPopup from '../hoc-helpers/withPopup';
import withUserContext from '../hoc-helpers/withUserContext';



const EditForm = ({onSubmit, userContext}) => { 
  const [inputs, setInputs] = React.useState({
    userName: userContext.userName,
    userDescription: userContext.userDescription
  });   
  const handleInput = ({target:{value, name}}) => {        
    setInputs({...inputs, [name]: value});           
  }  
  const handleSubmit = (e) =>{
    e.preventDefault();
    onSubmit(inputs);
  }
  const {userName, userDescription} = inputs;
   
  return ( 
                <form className="popup__form" name="edit" noValidate>
      <label className="popup__label">
        <input type="text" name="userName" id="owner-name"
               className="popup__input popup__input_type_name" placeholder="Имя"
               required minLength="2" maxLength="40" pattern="[a-zA-Zа-яА-Я -]{1,}"
               value={userName}
               onChange={handleInput}
               />
        <span className="popup__error" id="owner-name-error"></span>
      </label>
      <label className="popup__label">
        <input type="text" name="userDescription" id="owner-description"
               className="popup__input popup__input_type_description" placeholder="Занятие"
               required minLength="2" maxLength="200"
               value={userDescription}
               onChange={handleInput}
               />
        <span className="popup__error" id="owner-description-error"></span>
      </label>
      <button type="submit" onClick={handleSubmit} className="button popup__button">Сохранить</button>
    </form>
  )
}

export default withPopup(withUserContext(EditForm));