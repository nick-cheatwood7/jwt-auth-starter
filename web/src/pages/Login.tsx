import React, { useState } from "react";
import { useLoginMutation } from "../generated/graphql";
import { useNavigate } from "react-router-dom";

interface LoginProps {}

export const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login] = useLoginMutation();
  const navigate = useNavigate();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log("form submitted");
        const response = await login({
          variables: {
            email,
            password,
          },
        });
        console.log(response);

        if (response && response.data) {
          const token = response.data.login.accessToken;
          localStorage.setItem("token", token);
          console.log(localStorage.getItem("token"));
        }

        navigate("/", { replace: true });
      }}
    >
      <div>
        <input
          type="email"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );
};
