import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Image {
  @Field()
  url: string;
  @Field(_type => Int)
  height: number;
  @Field(_type => Int)
  width: number;
}
