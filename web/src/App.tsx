import React from "react";
import { useHelloQuery } from "./generated/graphql";

interface AppProps {}

const App: React.FC<AppProps> = () => {
  const { data, loading } = useHelloQuery()

  if (loading || !data) {
    return <div>loading...</div>
  }

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default App;
