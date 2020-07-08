import React, { Component } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

export default class App extends Component {
  state = {
    isEditProfilePopupOpen: false,
    isAddPlacePopupOpen: false,
    isEditAvatarPopupOpen: false,
  }

  handleEditAvatarClick = () => {
    this.setState(({isEditAvatarPopupOpen})=>{
      return {
        isEditAvatarPopupOpen: !isEditAvatarPopupOpen
      }
    })    
  }
  handleEditProfileClick = () => {
    this.setState(({isEditProfilePopupOpen})=>{
      return {
        isEditAvatarPopupOpen: true
      }
    })  
  }
  handleAddPlaceClick = () => {
    this.setState(({isAddPlacePopupOpen})=>{
      return {
        isEditAvatarPopupOpen: true
      }
    })  
  }
  closeAllPopups = () => {
    this.setState((state)=>{
      for (let key in state){
        state[key] = false;
      }
      return state;
    })  
  }
  render() {
    return (
      <>
        <Header />
        <Main 
        onEditProfile={this.handleEditProfileClick}
        onAddPlace={this.handleAddPlaceClick}
        onEditAvatar={this.handleEditAvatarClick}
        onClose={this.closeAllPopups}
        openState={this.state}
        />
        <Footer />
      </>
    );
  }
}
