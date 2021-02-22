import React from 'react';


import { useSelector } from 'react-redux';

import { useHistory } from "react-router-dom";
import { useActions } from '../reducers/useActions';
import { useCardsActions } from '../reducers/useCardsActions';
import travlrsApi from '../utils/travlrsApi';

export default function useTravlrsApi() {
  const { selectedCard } = useSelector(({ app }) => app);
  const { updateUserInfo, logIn, updateAuthStatus, closePopups } = useActions();
  const { cardsFill, addCard, deleteCard, usersFill } = useCardsActions();
  const history = useHistory();

  const loginCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      travlrsApi
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
          Promise.all([travlrsApi.getCardList(), travlrsApi.getUsers()])
            .then((res) => {
              const [cardsData, users] = res;
              cardsFill(cardsData);
              usersFill(users);
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
      history.push('/login');
    }
  };

  const onDeleteCardSubmit = (e) => {
    e.preventDefault();
    travlrsApi
      .removeCard(selectedCard._id)
      .then((res) => { 
        deleteCard(selectedCard._id);
        closePopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onAddCardSubmit = ({ name, link }) => {
    travlrsApi
      .addCard({ name, link })
      .then((card) => {
        addCard(card);
        closePopups();
      })
      .catch((err) => {
        updateAuthStatus({ message: 'Что-то пошло не так...' });
        console.log(err);
      });
  };
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


  return {
    loginCheck, onDeleteCardSubmit, onAddCardSubmit, handleEditSubmit, onAvatarEditSubmit
  }
}
