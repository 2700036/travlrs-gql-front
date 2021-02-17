/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from "react-redux";


export const LOGGED_IN = "LOGGED_IN";
export const LOGGED_OUT = "LOGGED_OUT";
export const UPDATE_AUTH_STATUS = "UPDATE_AUTH_STATUS";
export const OPEN_EDIT_PROFILE_POPUP = "OPEN_EDIT_PROFILE_POPUP";
export const OPEN_ADD_PLACE_POPUP = "OPEN_ADD_PLACE_POPUP";
export const OPEN_EDIT_AVATAR_POPUP = "OPEN_EDIT_AVATAR_POPUP";
export const OPEN_DELETE_CARD_CONFIRM_POPUP = "OPEN_DELETE_CARD_CONFIRM_POPUP";
export const CLOSE_POPUPS = "CLOSE_POPUPS";
export const UPDATE_USERINFO = "UPDATE_USERINFO";

export function useActions() {
  const dispatch = useDispatch();
  const userInfo = useSelector(({userInfo}) => userInfo);

  const loggedIn = () =>
    dispatch({
      type: LOGGED_IN
    });
  const loggedOut = () =>
    dispatch({
      type: LOGGED_OUT
    });
  const updateAuthStatus = payload =>
    dispatch({
      type: LOGGED_OUT,
      payload
    });
  const openEditProfilePopup = () => {
    dispatch({
      type: OPEN_EDIT_PROFILE_POPUP
    });
  };
  const openAddPlacePopup = () => {
    dispatch({
      type: OPEN_ADD_PLACE_POPUP
    });
  };
  const openEditAvatarPopup = () => {
    dispatch({
      type: OPEN_EDIT_AVATAR_POPUP
    });
  };
  const openDeleteCardConfirmPopup = payload => {
    dispatch({
      type: OPEN_DELETE_CARD_CONFIRM_POPUP,
      payload
    });
  };
  const closePopups = () => {
    dispatch({
      type: CLOSE_POPUPS
    });
  };
  const updateUserInfo = payload => {
    dispatch({
      type: UPDATE_USERINFO,
      payload: {...userInfo, ...payload}
    });
  };

  return {
    loggedIn,
    loggedOut,
    updateAuthStatus,
    openEditProfilePopup,
    openAddPlacePopup,
    openEditAvatarPopup,
    openDeleteCardConfirmPopup,
    closePopups,
    updateUserInfo
  };
}
