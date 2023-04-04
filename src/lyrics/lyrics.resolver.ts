import { Args, Query, Resolver } from '@nestjs/graphql';
import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/auth/auth.decorator';
import { Lyrics } from 'src/models';
import { LyricsService } from './lyrics.service';

@Resolver(_of => Lyrics)
export class LyricsResolver {
  constructor(private lyricsService: LyricsService) {}

  // would probably use trackId instead if we had a database instead
  @Query(_returns => Lyrics)
  async getLyrics(
    @User() user,
    @Args('trackName') trackName: string,
    @Args('artist') artist: string,
  ): Promise<Lyrics> {
    if (!user || !user.token) throw new UnauthorizedException();
    return this.lyricsService.find(trackName, artist);
  }
}
