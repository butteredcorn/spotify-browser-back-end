import { UnauthorizedException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from '../auth/auth.decorator';
import { Track } from '../models/track';
import { TracksService } from './tracks.service';

@Resolver(_of => Track)
export class TracksResolver {
  constructor(private tracksService: TracksService) {}

  @Query(_returns => [Track])
  async getTracks(
    @User() user,
    @Args('query') query: string,
    @Args('offset', { defaultValue: 0 }) offset: number,
  ): Promise<Track[]> {
    return this.tracksService.findAll(user.token, query, offset);
  }
}
