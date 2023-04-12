import { UnauthorizedException } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/auth/auth.decorator';
import { Track } from 'src/models/track';
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
    // todo: refactor into auth middleware -> use protected routes only, then throw in the middleware
    if (!user || !user.token) throw new UnauthorizedException();
    return this.tracksService.findAll(user.token, query, offset);
  }
}
