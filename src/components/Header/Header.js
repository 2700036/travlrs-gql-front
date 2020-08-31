import React from 'react';
import logo from '../../images/logo.ico';

const Header = (props) => {
  return (
    <header className="header page__section">
      <img src={logo} className='logo'/>
    <h1 className="header__logo">Travlrs.</h1>
    
  </header>
  )
};

export default Header;

