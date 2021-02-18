import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ImagePopup from '../ImagePopup/ImagePopup';
import { BrowserRouter as Router, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { CurrentUserContext } from './../currentUserContext/CurrentUserContext';
import travlrsApi from './../../utils/travlrsApi';
import './app.css';
import { CardsContext } from '../CardsContext/CardsContext';

import Spinner from '../Spinner/Spinner';
import Login from '../Login/Login';
import Register from '../Register/Register';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

import { useActions } from '../../reducers/useActions';
import { useSelector } from 'react-redux';

const App = ({ history }) => {
  const { loggedIn, authStatus, userInfo, openedPopup, selectedCard } = useSelector(({ app }) => app);
  const {
    updateUserInfo,
    logIn,
    updateAuthStatus,   
    closePopups,
  } = useActions();

  const [cards, setCards] = React.useState([]);
  const [users, setUsers] = React.useState([]);

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
    travlrsApi
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
    travlrsApi
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
                cards={cards}
                users={users}                
                onDeleteCardSubmit={onDeleteCardSubmit}                
                onAddCardSubmit={onAddCardSubmit}
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

        {openedPopup.isLoginStatusPopupOpen && (
          <InfoTooltip onClose={closePopups} name='tooltip' status={authStatus} />
          )}

         
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
};

export default withRouter(App);


