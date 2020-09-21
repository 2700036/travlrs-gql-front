import React from 'react';
import logo from '../../images/logo.ico';
import { Route, Link } from 'react-router-dom'

const Header = (props) => {
  return (
    <header className="header page__section">
      <img src={logo} className='logo'/>
    <h1 className="header__logo">Travlrs.</h1>
    <Route path='/login'>
      <Link to='/register' className='signup__link'>
      Регистрация
      </Link>
    </Route>
    <Route path='/register'>
      <Link to='/login' className='signup__link'>
      Войти
      </Link>
    </Route>
  </header>
  )
};

export default Header;

