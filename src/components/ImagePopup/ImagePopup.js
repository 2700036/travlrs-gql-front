import React, { Component } from 'react';

class ImagePopup extends Component {
  render() {
    const {card, onClose} = this.props;
    let classNames = '';
    if(card){
      classNames = `popup popup_type_image popup_is-opened`;      
    } else {
      classNames = `popup popup_type_image`
    }
    
    return (
      <>
        <div className={classNames}>
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
