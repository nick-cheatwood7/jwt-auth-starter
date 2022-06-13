import { ApolloLink, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";

export const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const requestLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const refreshLink = new TokenRefreshLink({
  accessTokenField: "accessToken",
  isTokenValidOrUndefined: () => {
    const token = localStorage.getItem("token");
    if (!token) {
      // No token
      return true;
    }

    try {
      // decode token
      const { exp }: any = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        // token expired
        return false;
      } else {
        // token valid
        return true;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  },
  fetchAccessToken: () => {
    return fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    });
  },
  handleFetch: (accessToken) => {
    // store the new access token
    localStorage.setItem("token", accessToken);
  },
  // handleResponse: () => {},
  handleError: (err) => {
    // handle misc errors related to fetching new access token
    console.warn("Your refresh token is invalid. Try to re-login.");
    console.error(err);
  },
});

const links = ApolloLink.from([refreshLink, requestLink, httpLink]);

export default links;
