import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Image } from './image';

@ObjectType()
export class Artist {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  href: string;
  @Field()
  uri: string;
  @Field()
  type: string; // spotify entity type ie. artist
  @Field(_type => [String])
  genres: string[];
  @Field(_type => Int)
  popularity: number;
  @Field(_type => [Image])
  images?: Image[];
}
