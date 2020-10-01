import React from 'react';
import withPopup from '../hoc-helpers/withPopup';
import success from '../../images/success.png';
import failed from '../../images/failed.png';

const InfoTooltip = ({status}) => {
  console.log(status)
  if(status.name){
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
    <p>{status.message}</p>
    </>
    )
  }
  
}

export default withPopup(InfoTooltip);
