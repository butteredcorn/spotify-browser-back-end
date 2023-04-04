import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Lyrics {
  @Field()
  id: string;
  @Field()
  text: string;
}
