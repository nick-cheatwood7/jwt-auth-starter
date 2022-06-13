import React, { useEffect, useState } from "react";
import axios from "axios";
import Routes from "./Routes";

interface Props {}

export const App: React.FC<Props> = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const getRefreshToken = async (): Promise<void> => {
    const response = await axios.post(
      "http://localhost:4000/refresh_token",
      {},
      { withCredentials: true }
    );
    console.log(response.data);
    setLoading(false);
  };

  useEffect(() => {
    // get new refresh token
    getRefreshToken();
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return <Routes />;
};
