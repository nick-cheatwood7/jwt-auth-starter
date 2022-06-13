import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { hash, compare } from "bcrypt";
import { MyContext } from "../../utils/types";
import { User } from "../../db/entities";
import { createAccessToken, createRefreshToken, isAuth } from "../../auth";
import { sendRefreshToken } from "../../utils/services/sendRefreshToken";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
  @Field(() => User)
  user: User;
}

@Resolver(User)
export default class UserResolver {
  @Query(() => [User])
  async users(@Ctx() { em }: MyContext): Promise<User[]> {
    const users = await em.find(User, {});
    return users;
  }

  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() { em, payload }: MyContext): Promise<User | null> {
    const user = await em.findOne(User, { id: payload?.userId });
    if (!user) {
      return null;
    }
    return user;
  }

  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    const hashedPassword = await hash(password, 15);
    console.log(hashedPassword);
    const user = em.create(User, {
      email: email,
      password: hashedPassword,
    });

    try {
      await em.persistAndFlush(user);
    } catch (err) {
      console.error(err);
      return false;
    }

    return true;
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(
    @Arg("userId") userId: string,
    @Ctx() { em }: MyContext
  ): Promise<boolean> {
    const user = await em.findOne(User, { id: userId });
    if (!user) {
      throw new Error("no user found");
    }
    // increment token version for user
    user.tokenVersion = (user.tokenVersion as number) + 1;
    em.persistAndFlush(user);
    return true;
  }

  @Mutation(() => Boolean)
  async logout(
    @Ctx() {res}: MyContext
  ): Promise<boolean> {
    sendRefreshToken(res, "");
    return true;
  }

  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res, em }: MyContext
  ): Promise<LoginResponse> {
    const user = await em.findOne(User, { email: email });
    if (!user) {
      throw new Error("no user found");
    }
    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      throw new Error("invalid password");
    }

    // login successful
    user.lastLogin = new Date();
    await em.persistAndFlush(user);

    sendRefreshToken(res, createRefreshToken(user));

    return {
      accessToken: createAccessToken(user),
      user,
    };
  }
}
