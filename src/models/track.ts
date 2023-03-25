import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Album } from './album';
import { Artist } from './artist';
import { Image } from './image';

@ObjectType() // graphql decorator
export class Track {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  href: string;
  @Field()
  uri: string;
  @Field()
  type: string; // spotify entity? type ie. track
  @Field(_type => [String])
  genres: string[];
  @Field(_type => Int)
  popularity: number;
  @Field(_type => [Image])
  images?: Image[];
  @Field(_type => Album)
  album?: Album;
  @Field(_type => [Artist])
  artists?: Artist[];
}
