//all reducers, see articles for reducer info
const GithubReducer = (state, action) => {
  switch (action.type) {
    case "GET_USERS":
      return { ...state, users: action.payload, loading: false };
    case "SET_LOADING_TRUE": //returns the initial state object, with loading set to payload.
      return { ...state, loading: action.payload.loading };
    //CD attempt
    case "CLEAR_USERS":
      return { ...state, users: action.payload.users };
    case "GET_USER":
      return {
        ...state,
        user: action.payload.data,
        loading: action.payload.loading,
      };
    case "SET_REPOS":
      return {
        ...state,
        repos: action.payload.data,
        loading: action.payload.loading,
      };

    default:
      return state;
  }
};

export default GithubReducer;
