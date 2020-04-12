
var GET_STATE = {
  offset: 0,
  limit: 18,
  total: 0,
  count: 0,
  results: [],
  selected: {},
  nameSearch: ""
};

const character = (state = GET_STATE, action) => {
  switch (action.type) {
      case "GET_CHARACTERS":
              return { ...state, ...action.container, nameSearch: action.nameSearch };
      case "MORE_CHARACTERS":
          return {
              ...state,
              ...action.container,
              results: [...state.results, ...action.container.results]
          };
      case "EDIT_CHARACTER":
          return state;
      case "SELECT_CHARACTER":
          return { ...state, selected: action.character };
      case "UNSELECT_CHARACTER":
          return { ...state, selected: {} };
      default:
          return state
  }
}

export default character;