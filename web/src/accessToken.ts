let accessToken = "";

export const setAccessToken = (token: string): void => {
  accessToken = token;
};

export const getAccessToken = (): string => {
  return accessToken;
};

export const getAuthString = (): string => {
  console.log("finding access token", accessToken);
  if (accessToken) {
    return `bearer ${accessToken}`;
  }
  return "";
};
