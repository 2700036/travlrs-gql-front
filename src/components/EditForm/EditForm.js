import React from 'react';
import withPopup from '../hoc-helpers/withPopup';
import withUserContext from '../hoc-helpers/withUserContext';
import { useForm } from 'react-hook-form';

const EditForm = ({ onSubmit, userContext }) => {
  const { handleSubmit, register, errors } = useForm({
    mode: 'onChange',
  });
  const handleData = (data) => {
    onSubmit(data);
  };

  return (
    <form className='popup__form' onSubmit={handleSubmit(handleData)} name='edit' noValidate>
      <label className='popup__label'>
        <input
          name='userName'
          ref={register({
            required: 'Это поле необходимо заполнить',
            pattern: {
              value: /^[a-zA-Zа-яА-Я -]/,
              message: 'Введите данные в нужном формате',
            },
            minLength: {
              value: 2,
              message: 'Должно быть не менее 2 символов',
            },
            maxLength: {
              value: 30,
              message: 'Должно быть не менее 30 символов',
            },
          })}
          type='text'
          id='owner-name'
          className={`popup__input ${errors.userName ? 'popup__input_type_error' : ''}`}
          defaultValue={userContext.userName}
        />
        {errors.userName && (
          <span className='popup__error' id='owner-name-error'>
            {errors.userName.message}
          </span>
        )}
      </label>
      <label className='popup__label'>
        <input
          name='userDescription'
          ref={register({
            required: 'Это поле необходимо заполнить',
            minLength: {
              value: 2,
              message: 'Должно быть не менее 2 символов',
            },
            maxLength: {
              value: 30,
              message: 'Должно быть не менее 30 символов',
            },
            pattern: {
              value: /^[a-zA-Zа-яА-Я -]{1,}/,
              message: 'Введите данные в нужном формате',
            },
          })}
          type='text'
          id='owner-description'
          className={`popup__input ${errors.userDescription ? 'popup__input_type_error' : ''}`}
          required
          minLength='2'
          maxLength='200'
          defaultValue={userContext.userDescription}
        />
        {errors.userDescription && (
          <span className='popup__error' id='owner-description-error'>
            {errors.userDescription.message}
          </span>
        )}
      </label>
      <button type='submit' className='button popup__button'>
        Сохранить
      </button>
    </form>
  );
};

export default withPopup(withUserContext(EditForm));
