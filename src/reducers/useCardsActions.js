import { useDispatch, useSelector } from "react-redux";
export const CARDS_FILL = 'CARDS_FILL';
export const ADD_CARD = 'ADD_CARD';
export const DELETE_CARD = 'DELETE_CARD';
export const UPDATE_LIKE_CARD = 'UPDATE_LIKE_CARD';
export const USERS_FILL = 'USERS_FILL';

export function useCardsActions() {
  const dispatch = useDispatch();
  const cardsFill = (payload) => dispatch({
    type: CARDS_FILL,
    payload,
  });
  const addCard = (payload) => dispatch({
    type: ADD_CARD,
    payload,
  });
  const deleteCard = (payload) => dispatch({
    type: DELETE_CARD,
    payload,
  });
  const updateLikeCard = (payload) => dispatch({
    type: UPDATE_LIKE_CARD,
    payload,
  });
  const usersFill = (payload) => dispatch({
    type: USERS_FILL,
    payload,
  });

  return {
    cardsFill,
    addCard,
    deleteCard,
    updateLikeCard,
    usersFill,
  };
}
