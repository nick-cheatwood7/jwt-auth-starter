import React from "react";
import { useMeQuery } from "../generated/graphql";

interface MeProps {}

export const Me: React.FC<MeProps> = () => {
  const { data, loading, error } = useMeQuery({
    fetchPolicy: "network-only",
  });

  if (loading) {
    return <div>loading..</div>;
  }

  if (error) {
    console.error(error);
    return <div>err</div>;
  }

  if (!data) {
    return <div>no data</div>;
  }

  return <div>{JSON.stringify(data, null, 2)}</div>;
};
