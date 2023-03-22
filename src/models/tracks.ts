import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType() // graphql decorator
export class Track {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  uri: string;
  @Field()
  type: string;
  @Field(_type => [String])
  genres: string[];
  @Field(_type => [TrackImage])
  images: TrackImage[];
}

@ObjectType()
export class TrackImage {
  @Field()
  url: string;
  @Field(_type => Int)
  height: number;
  @Field(_type => Int)
  width: number;
}
