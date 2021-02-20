/* eslint-disable no-unused-vars */
import { useDispatch } from 'react-redux';

export const LOG_IN = 'LOG_IN';
export const LOG_OUT = 'LOG_OUT';
export const UPDATE_AUTH_STATUS = 'UPDATE_AUTH_STATUS';
export const OPEN_EDIT_PROFILE_POPUP = 'OPEN_EDIT_PROFILE_POPUP';
export const OPEN_ADD_PLACE_POPUP = 'OPEN_ADD_PLACE_POPUP';
export const OPEN_EDIT_AVATAR_POPUP = 'OPEN_EDIT_AVATAR_POPUP';
export const OPEN_DELETE_CARD_CONFIRM_POPUP = 'OPEN_DELETE_CARD_CONFIRM_POPUP';
// export const OPEN_LOGIN_STATUS_POPUP = "OPEN_LOGIN_STATUS_POPUP";
export const CLOSE_POPUPS = 'CLOSE_POPUPS';
export const UPDATE_USERINFO = 'UPDATE_USERINFO';

export function useActions() {
  const dispatch = useDispatch();
  

  const logIn = () =>
    dispatch({
      type: LOG_IN,
    });
  const logOut = () =>
    dispatch({
      type: LOG_OUT,
    });
  const updateAuthStatus = (payload) =>
    dispatch({
      type: UPDATE_AUTH_STATUS,
      payload,
    });
  const openEditProfilePopup = () => 
    dispatch({
      type: OPEN_EDIT_PROFILE_POPUP,
    });
  
  const openAddPlacePopup = () => 
    dispatch({
      type: OPEN_ADD_PLACE_POPUP,
    });
  
  const openEditAvatarPopup = () => 
    dispatch({
      type: OPEN_EDIT_AVATAR_POPUP,
    });
  
  const openDeleteCardConfirmPopup = (payload) => 
    dispatch({
      type: OPEN_DELETE_CARD_CONFIRM_POPUP,
      payload,
    });
  
  const closePopups = () => {
    dispatch({
      type: CLOSE_POPUPS,
    });
  };
  const updateUserInfo = (payload) =>
    dispatch({
      type: UPDATE_USERINFO,
      payload,
    });

  return {
    logIn,
    logOut,
    updateAuthStatus,
    openEditProfilePopup,
    openAddPlacePopup,
    openEditAvatarPopup,
    openDeleteCardConfirmPopup,
    // openLoginStatusPopup,
    closePopups,
    updateUserInfo,
  };
}
