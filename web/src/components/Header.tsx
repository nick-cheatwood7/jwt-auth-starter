import React from "react";
import { Link } from "react-router-dom";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const { data, loading } = useMeQuery();
  const [logout, { client }] = useLogoutMutation();

  let body: any = null;

  if (loading) {
    body = null;
  } else if (data && data.me) {
    body = <div>You are logged in as: {data.me.email}</div>;
  } else {
    body = <div>not logged in</div>;
  }

  return (
    <header>
      <div>
        <Link to="/">home</Link>
      </div>
      <div>
        <Link to="/register">register</Link>
      </div>
      <div>
        <Link to="/login">login</Link>
      </div>
      <div>
        <Link to="/me">me</Link>
      </div>
      <div>
        {!loading && data && data.me ? (
          <button onClick={async () => {
            await logout()
            localStorage.setItem("token", "")
            await client.resetStore();
          }}>logout</button>
        ): null }
      </div>
      {body}
    </header>
  );
};
