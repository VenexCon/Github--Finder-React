import { createContext } from "react";
import { useReducer } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    loading: false,
    user: {},
    repos: [],
  };

  //returns new state, based on the action type
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
      //No longer passing initialState into the values, but the values of the returned reducer state.
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
