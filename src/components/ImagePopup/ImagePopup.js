import React, { Component } from 'react';

class ImagePopup extends Component {
  render() {
    const {card, onClose} = this.props;
   
    
    return (
      <>
        <div className='popup popup_type_image popup_is-opened'>
          <div className='popup__content popup__content_content_image'>
            <button 
            type='button' 
            className='popup__close'
            onClick={onClose}
            ></button>
            <img alt={`Фото места ${card.name}`} src={card.link} className='popup__image' />
    <p className='popup__caption'>{card.name}</p>
          </div>
        </div>
      </>
    );
  }
}

export default ImagePopup;
