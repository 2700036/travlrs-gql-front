import React from 'react';

const EditForm = ({initialUserInfo}) => {
  const [inputs, setInputs] = React.useState({
    userName: '',
    userDescription: ''
  })  
  
  React.useEffect(()=>{    
    setInputs({
      userName: initialUserInfo.userName,
      userDescription: initialUserInfo.userDescription
    })
  }, [initialUserInfo.userName, initialUserInfo.userDescription])
  
  const handleInput = ({target:{value, name}}) => {        
    setInputs({...inputs, [name]: value});           
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
      <button type="submit" className="button popup__button">Сохранить</button>
    </form>
  )
}

export default EditForm;