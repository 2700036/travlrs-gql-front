import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class ImagePopup extends Component {
  render() {
    const {card} = this.props;
   
    
    return (
      <>
        <div className='popup popup_type_image popup_is-opened'>
          <div className='popup__content popup__content_content_image'>
            <Link to='/'>
            <button 
            type='button' 
            className='popup__close'
            
            ></button>
            </Link>
            <img alt={`Фото места ${card.name}`} src={card.link} className='popup__image' />
    <p className='popup__caption'>{card.name}</p>
          </div>
        </div>
      </>
    );
  }
}

export default ImagePopup;
