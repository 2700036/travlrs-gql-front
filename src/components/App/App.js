import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

const App = () => {
  const [popups, setPopups] = React.useState({
    isEditProfilePopupOpen: false,
    isAddPlacePopupOpen: false,
    isEditAvatarPopupOpen: false,
    isPhotoPreviewPopupOpened: false,
    isDeleteCardPopupOpened: false
  })
  const [selectedCard, setSelectedCard] = React.useState(false)
  
  const handleEditAvatarClick = () => {
    setPopups({isEditAvatarPopupOpen: true})    
  }
  const handleEditProfileClick = () => {
    setPopups({isEditProfilePopupOpen: true})
  }
  const handleAddPlaceClick = () => {
    setPopups({isAddPlacePopupOpen: true})
  }
  const handleBasketIconClick = (card) => {
    setSelectedCard(card);
    setPopups({isDeleteCardPopupOpened: true})
  }
  const closeAllPopups = () => {
    setPopups({isEditAvatarPopupOpen: false, isEditProfilePopupOpen: false, isAddPlacePopupOpen: false});
    setSelectedCard(false)  
    }    
    return (
      <>
        <Header />
        <Main 
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onClose={closeAllPopups}
        openState={popups}        
        handleBasketIconClick={handleBasketIconClick}
        selectedCard={selectedCard}
        />
        <Footer />
      </>
    );
  
}

export default App;