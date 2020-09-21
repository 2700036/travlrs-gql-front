import React from 'react';
import withPopup from '../hoc-helpers/withPopup';
import success from '../../images/success.png';
import failed from '../../images/failed.png';

const InfoTooltip = ({status}) => {
  
  if(status.data){
    return (
      <>
    <img src={success}/>
    <p>Вы успешно зарегистрировались!</p>
    </>
    )
  } else {
    return (
      <>
    <img src={failed}/>
    <p>{status.error}</p>
    </>
    )
  }
  
}

export default withPopup(InfoTooltip);
