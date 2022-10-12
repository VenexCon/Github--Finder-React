import axios from "axios";
const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;
const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;

const github = axios.create({
  baseURL: GITHUB_URL,
  headers: { Authorization: `token ${GITHUB_TOKEN}` },
});

// Get Search Results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  });

  const response = await github.get(`/search/users?${params}`);

  return response.data.items;
};

/* //get a single user
export const getUser = async (login) => {
  const response = await fetch(`${GITHUB_URL}/users/${login}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
    },
  });
  if (response.status === 404) {
    window.location = "/notfound";
  } else {
    const data = await response.json();

    return data;
    //dispatch({ type: "GET_USER", payload: { data: data, loading: false } });
  }
};

//Get User Repos
export const getUserRepos = async (login) => {
  const params = new URLSearchParams({
    sort: "created",
    per_page: 10,
  }); */

//combined getUser and getUserRepos with Axios, old funcs left in.
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);

  console.log(user, repos);
  //no need for response.json() with axios, Axios returns an object called {data}
  return { user: user.data, repos: repos.data };
};
//dispatch({ type: "SET_REPOS", payload: { data: data, loading: false } });
