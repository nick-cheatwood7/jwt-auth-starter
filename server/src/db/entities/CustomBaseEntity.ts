import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field, Float } from "type-graphql";
import { v4 } from "uuid";

@ObjectType({ isAbstract: true })
@Entity({ abstract: true })
export default abstract class CustomBaseEntity {
  @Field()
  @PrimaryKey()
  id: string = v4();

  @Field(() => Float)
  @Property()
  createdAt?: Date = new Date();

  @Field(() => Float, { nullable: true })
  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date = new Date();
}
