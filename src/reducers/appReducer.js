import {
  LOG_IN,
  LOG_OUT,
  UPDATE_AUTH_STATUS,
  OPEN_EDIT_PROFILE_POPUP,
  OPEN_ADD_PLACE_POPUP,
  OPEN_EDIT_AVATAR_POPUP,
  OPEN_DELETE_CARD_CONFIRM_POPUP,
  CLOSE_POPUPS,
  UPDATE_USERINFO
} from "./useActions";

const initialState = {
  loggedIn: false,
  authStatus: null,
  openedPopup: {
    isEditProfilePopupOpen: false,
    isAddPlacePopupOpen: false,
    isEditAvatarPopupOpen: false,
    isDeleteCardPopupOpened: false,
    isLoginStatusPopupOpen: false
  },
  selectedCard: false,
  userInfo: null,  
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOG_IN:
      return { ...state, loggedIn: true };
    case LOG_OUT:
      return { ...state, loggedIn: false, userInfo: null };
    case UPDATE_AUTH_STATUS:
      return { ...state, 
        authStatus: payload,
        openedPopup: { isLoginStatusPopupOpen: true }        
    };
    case OPEN_EDIT_PROFILE_POPUP:
      return { ...state, openedPopup: { isEditProfilePopupOpen: true } };
    case OPEN_ADD_PLACE_POPUP:
      return { ...state, openedPopup: { isAddPlacePopupOpen: true } };
    case OPEN_EDIT_AVATAR_POPUP:
      return { ...state, openedPopup: { isEditAvatarPopupOpen: true } };
    case OPEN_DELETE_CARD_CONFIRM_POPUP:
      return {
        ...state,
        selectedCard: payload,
        openedPopup: { isDeleteCardPopupOpened: true }
      };
    case CLOSE_POPUPS:
      return { ...state, selectedCard: false, openedPopup: {} };
    case UPDATE_USERINFO:
      return {
        ...state,
        userInfo: payload
      };

    default:
      return state;
  }
};
