const initialState = {
  cards: [],
  users: []
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  // case CARDS_FILL:
  //   return { ...state, cards: payload }
  // case ADD_CARD:
  //   return { ...state, cards: [payload, ...state.cards] }
  // case DELETE_CARD:
  //   const newCards = [...state.cards].filter(el=> el._id !== payload)
  //   return { ...state, cards: newCards }
  // case USERS_FILL:
  //   return { ...state, users: payload }

  default:
    return state
  }
}
