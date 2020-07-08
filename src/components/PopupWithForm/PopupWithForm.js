import React, { Component } from 'react';

class PopupWithForm extends Component {
  render() {
    const { title, name, isOpen, onClose } = this.props;
    let classNames = '';
    if(isOpen){
      classNames = `popup popup_type_${name} popup_is-opened`
    } else {
      classNames = `popup popup_type_${name}`
    }
    return (
      <>
        <div className={classNames}>
          <div className='popup__content' >
            <button 
            type='button' 
            className='popup__close'
            onClick={onClose}
            ></button>
            <h3 className='popup__title'>{title}</h3>
            {this.props.children}
          </div>
        </div>
      </>
    );
  }
}

export default PopupWithForm;
