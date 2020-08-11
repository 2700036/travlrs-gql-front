import React from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

const App = () => {
  const [openedPopup, setOpenedPopup] = React.useState({})
  const [selectedCard, setSelectedCard] = React.useState(false)
  
  const handleEditAvatarClick = () => {
    setOpenedPopup({isEditAvatarPopupOpen: true})         
  }
  const handleEditProfileClick = () => {
    setOpenedPopup({isEditProfilePopupOpen: true})
  }
  const handleAddPlaceClick = () => {
    setOpenedPopup({isAddPlacePopupOpen: true})
  }
  const handleBasketIconClick = (card) => {
    setSelectedCard(card);
    setOpenedPopup({isDeleteCardPopupOpened: true})
  }
  const closeAllPopups = () => {
    setOpenedPopup({});
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
        openedPopup={openedPopup}        
        handleBasketIconClick={handleBasketIconClick}
        selectedCard={selectedCard}
        />
        <Footer />
      </>
    );
  
}

export default App;