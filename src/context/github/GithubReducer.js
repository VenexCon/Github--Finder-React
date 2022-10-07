//all reducers, see articles for reducer info
const GithubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload, loading: false };
    default:
      return state;
  }
};

export default GithubReducer;
