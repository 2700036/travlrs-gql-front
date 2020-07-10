import React, { Component } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

export default class App extends Component {
  state = {
    popups: {
      isEditProfilePopupOpen: false,
      isAddPlacePopupOpen: false,
      isEditAvatarPopupOpen: false
    },
      selectedCard: false,
  }

  handleEditAvatarClick = () => {
    this.setState(({popups})=>{
      return {
        popups: {isEditAvatarPopupOpen: true}
      }
    })    
  }
  handleEditProfileClick = () => {
    this.setState(({popups})=>{
      return {
        popups: {isEditProfilePopupOpen: true}
      }
    })  
  }
  handleAddPlaceClick = () => {
    this.setState(({popups})=>{
      return {
        popups: {isAddPlacePopupOpen: true}
      }
    })  
  }
  closeAllPopups = () => {
    this.setState(({popups})=>{      
      for (let key in popups){
        popups[key] = false;
      };      
      return {popups, selectedCard: false};
    })  
  }
  handleCardClick = (card) => {
    this.setState({selectedCard: card});
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
        openState={this.state.popups}
        handleCardClick={this.handleCardClick}
        card={this.state.selectedCard}
        />
        <Footer />
      </>
    );
  }
}
