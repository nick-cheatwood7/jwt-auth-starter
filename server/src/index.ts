import "dotenv-safe/config";
import { MikroORM } from "@mikro-orm/core";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import mikroOrmConfig from "./mikro-orm.config";
import { ApolloServer } from "apollo-server-express";
import { createSchema } from "./utils/helpers/createSchema";
import cookieParser from "cookie-parser";
import { verify } from "jsonwebtoken";
import { User } from "./db/entities";
import { createAccessToken, createRefreshToken } from "./auth";
import { sendRefreshToken } from "./utils/services/sendRefreshToken";

const main = async () => {
  const orm = await MikroORM.init(mikroOrmConfig);
  await orm.getMigrator().up();

  const app: Express = express();
  app.use(
    cors({
      origin: [process.env.CORS_ORIGIN, "https://studio.apollographql.com"],
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.get("/", (_req: Request, res: Response) => {
    res.status(200).json({ message: "Hello World" });
  });

  app.post("/refresh_token", async (req: Request, res: Response) => {
    const token = req.cookies.jid;
    if (!token) {
      return res.status(401).json({ error: true, accessToken: null });
    }

    let payload: any = null;
    try {
      payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      console.error(err);
      return res.status(400).json({ error: true, accessToken: null });
    }

    // token is valid
    const user = await orm.em.fork().findOne(User, { id: payload.userId });
    if (!user) {
      return res.status(404).json({ error: true, accessToken: null });
    }

    if (user.tokenVersion !== payload.tokenVersion) {
      return res.status(401).json({ error: true, accessToken: null });
    }

    sendRefreshToken(res, createRefreshToken(user));

    return res
      .status(201)
      .json({ error: false, accessToken: createAccessToken(user) });
  });

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      em: orm.em.fork(),
      req,
      res,
    }),
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("server started on http://localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
