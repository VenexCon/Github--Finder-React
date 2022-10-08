//all reducers, see articles for reducer info
const GithubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload, loading: false };
    case "SET_LOADING_TRUE": //returns the initial state object, with loading set to payload.
      return { ...state, loading: action.payload.loading };

    default:
      return state;
  }
};

export default GithubReducer;
