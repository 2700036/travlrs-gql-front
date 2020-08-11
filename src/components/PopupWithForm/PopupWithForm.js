import React, { useCallback, useEffect, useRef } from 'react';

const PopupWithForm = ({ title, name, onClose, children }) => {
  const popup = useRef();
  const smoothClose = useCallback(() => {
    popup.current.classList.remove('popup_is-opened');
    popup.current.addEventListener('transitionend', onClose, true)
  }, [onClose])

  const escFunction = useCallback(({keyCode}) => {
    if(keyCode === 27) {
      smoothClose();
    }
  }, [smoothClose]);
  const hadleOverlayClick = useCallback(({target})=>{
    if(target.classList.contains('popup')){
      smoothClose();
    }
  }, [smoothClose])

  useEffect(() => {
    popup.current.classList.add('popup_is-opened')
    document.addEventListener("keydown", escFunction);
    document.addEventListener("click", hadleOverlayClick);
    return () => {
      document.removeEventListener("keydown", escFunction);
      document.removeEventListener("click", hadleOverlayClick);
      
    };
  }, [escFunction, hadleOverlayClick, onClose]);

  return (
    <>
    <div ref={popup} className={`popup popup_type_${name} `}>
      <div className='popup__content' >
        <button 
        type='button' 
        className='popup__close'
        onClick={smoothClose}
        ></button>
        <h3 className='popup__title'>{title}</h3>
        {children}
      </div>
    </div>
  </>
  )
}


// class PopupWithForm extends Component {

//   render() {
//     const { title, name, onClose } = this.props;
    
//     return (
//       <>
//         <div className={`popup popup_type_${name} popup_is-opened`}>
//           <div className='popup__content' >
//             <button 
//             type='button' 
//             className='popup__close'
//             onClick={onClose}
//             ></button>
//             <h3 className='popup__title'>{title}</h3>
//             {this.props.children}
//           </div>
//         </div>
//       </>
//     );
//   }
// }

export default PopupWithForm;
