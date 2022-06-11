import "dotenv-safe/config";
import { sign, verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { User } from "./db/entities";
import { MyContext } from "./utils/types";

export const createAccessToken = (user: User): string => {
  const token = sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  return token;
};

export const createRefreshToken = (user: User): string => {
  const token = sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return token;
};

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET);
    context.payload = payload as any;
  } catch (err) {
    console.error(err);
    throw new Error("not authenticated");
  }

  return next();
};
