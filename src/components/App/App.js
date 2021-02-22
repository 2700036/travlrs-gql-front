import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import { Switch, Route } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import Login from '../Login/Login';
import Register from '../Register/Register';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import { useSelector } from 'react-redux';
import useTravlrsApi from '../../hooks/useTravlrsApi';
import './app.css';

const App = () => {
  const { loggedIn, userInfo, openedPopup } = useSelector(({ app }) => app);
  const { loginCheck } = useTravlrsApi();
 
  React.useEffect(() => {
    loginCheck();    
  }, [loggedIn]);

  return (
    <>
      <Header />
      <Switch>
        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />
        <Route path='/'>{loggedIn && userInfo ? <Main /> : <Spinner />}</Route>
      </Switch>
      <Footer />
      {openedPopup.isLoginStatusPopupOpen && <InfoTooltip name='tooltip' />}
    </>
  );
};

export default App;
