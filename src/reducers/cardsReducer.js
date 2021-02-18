import { CARDS_FILL, ADD_CARD, DELETE_CARD, UPDATE_LIKE_CARD, USERS_FILL } from './useCardsActions';

const initialState = {
  cards: [],
  users: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case CARDS_FILL:
      return { ...state, cards: payload };
    case ADD_CARD:
      return { ...state, cards: [payload, ...state.cards] };
    case DELETE_CARD:
      const newCards = [...state.cards].filter((el) => el._id !== payload);
      return { ...state, cards: newCards };
    case UPDATE_LIKE_CARD:
      const newCards2 = [...state.cards];
      const card = newCards2.find((card) => card._id === payload._id);
      card.likes = payload.likes;
      return { ...state, cards: newCards2 };
    case USERS_FILL:
      return { ...state, users: payload };

    default:
      return state;
  }
};
