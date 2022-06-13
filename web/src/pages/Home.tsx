import React from "react";
import { useUsersQuery } from "../generated/graphql";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  const { data } = useUsersQuery({ fetchPolicy: "network-only" });

  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <div>users:</div>
      <ul>
        {data.users.map((u) => {
          return (
            <li key={u.id}>
              {u.email}, {u.id}, {u.lastLogin}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
