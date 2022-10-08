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
  };

  //returns new state, based on the action type
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Get initial Users (testing purposes)
  const fetchUsers = async () => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    const data = await response.json();

    dispatch({ type: "GET_USERS", payload: data });
  };

  const setLoading = () => {
    //tells reducer to set initial state to true
    dispatch({ type: "SET_LOADING_TRUE", payload: { loading: true } });
  };

  return (
    <GithubContext.Provider
      value={{ users: state.users, loading: state.loading, fetchUsers }}
      //No longer passing initialState into the values, but the values of the returned reducer state.
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
