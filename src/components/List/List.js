import React from 'react';
import { useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import ImagePopup from '../ImagePopup/ImagePopup';
import Spinner from '../Spinner/Spinner';

export default function List({ items, itemComponent }) {
  const match = useRouteMatch();
  const history = useHistory();
  const location = useLocation();
  const photoId = match.params.id;
  const makeListOfElements = (elements, Component) => {
    return elements.map((card) => <Component card={card} key={card._id} />);
  };
  console.log(items)

  return <>
  <ul className='places__list'>
    {makeListOfElements(items, itemComponent)}
    </ul>
    {photoId && (<ImagePopup card={items.find(({ _id }) => photoId === _id)} onClose={() => history.push('/cards/')} /> || <Spinner/>)}
    
    </>;
}

{/* <Route path='/:elements/:id' render={()=>{
  return <ImagePopup 
  card={items.find(({ _id }) => photoId === _id)} 
  onClose={} />
}} /> */}