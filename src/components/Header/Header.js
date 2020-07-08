import React from 'react';
import logo from '../../images/logo.svg';

const Header = (props) => {
  return (
    <header className="header page__section">
    <img src={logo} alt="Логотип проекта масто" className="logo header__logo"/>
  </header>
  )
};

export default Header;

