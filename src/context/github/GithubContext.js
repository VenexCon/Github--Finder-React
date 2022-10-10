import { createContext } from "react";
import { useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
    user: {},
    repos: [],
  };

  //returns new state, based on the action type
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Get Search Results
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({
      q: text,
    });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const { items } = await response.json();

    dispatch({ type: "GET_USERS", payload: items });
  };

  //get a single user
  const getUser = async (login) => {
    setLoading();
    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    if (response.status === 404) {
      window.location = "/notfound";
    } else {
      const data = await response.json();

      dispatch({ type: "GET_USER", payload: { data: data, loading: false } });
    }
  };

  //Get User Repos
  const getUserRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    const data = await response.json();

    dispatch({ type: "SET_REPOS", payload: { data: data, loading: false } });
  };

  const setLoading = () => {
    //tells reducer to set initial state to true
    dispatch({ type: "SET_LOADING_TRUE", payload: { loading: true } });
  };

  //Clear Users from State
  const clearUsers = () => {
    dispatch({ type: "CLEAR_USERS", payload: { users: [] } });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,
        user: state.user,
        getUser,
        getUserRepos,
        repos: state.repos,
      }}
      //No longer passing initialState into the values, but the values of the returned reducer state.
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
