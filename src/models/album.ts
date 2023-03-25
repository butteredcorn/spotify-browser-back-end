import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Image } from './image';

@ObjectType()
export class Album {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  href: string;
  @Field()
  uri: string;
  @Field()
  type: string; // spotify entity? type ie. album
  @Field()
  is_playable: boolean;
  @Field(_type => Int)
  total_tracks: number;
  @Field()
  release_date: string; // YYYY-MM-DD
  @Field(_type => [Image])
  images?: Image[];
}
