import React, { useCallback, useEffect } from 'react';

const PopupWithForm = ({ title, name, onClose, children }) => {
  const escFunction = useCallback(({keyCode}) => {
    if(keyCode === 27) {
      onClose();
    }
  }, [onClose]);
  const hadleOverlayClick = useCallback(({target})=>{
    if(target.classList.contains('popup')){
      onClose();
    }
  }, [onClose])

  useEffect(() => {
    document.addEventListener("keydown", escFunction);
    document.addEventListener("click", hadleOverlayClick);
    return () => {
      document.removeEventListener("keydown", escFunction);
      document.removeEventListener("click", hadleOverlayClick);
    };
  }, [escFunction, hadleOverlayClick]);

  return (
    <>
    <div className={`popup popup_type_${name} popup_is-opened`}>
      <div className='popup__content' >
        <button 
        type='button' 
        className='popup__close'
        onClick={onClose}
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
