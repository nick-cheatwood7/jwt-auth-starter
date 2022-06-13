import React, { useState } from "react";
import { useRegisterMutation } from "../generated/graphql";
import { useNavigate } from "react-router-dom";

interface RegisterProps {}

export const Register: React.FC<RegisterProps> = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [register] = useRegisterMutation();
  const navigate = useNavigate();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        console.log("form submitted");
        const response = await register({
          variables: {
            email,
            password,
          },
        });
        console.log(response);
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
      <button type="submit">register</button>
    </form>
  );
};
