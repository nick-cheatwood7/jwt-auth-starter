import { Entity, Property } from "@mikro-orm/core";
import { ObjectType, Field, Float } from "type-graphql";
import CustomBaseEntity from "./CustomBaseEntity";

@ObjectType()
@Entity({ tableName: "users" })
export default class User extends CustomBaseEntity {
  @Field()
  @Property({ unique: true })
  email!: string;

  @Property()
  password!: string;

  @Field(() => Float, { nullable: true })
  @Property({ nullable: true })
  lastLogin?: number;

  @Property({ default: 0 })
  tokenVersion?: number;
}
