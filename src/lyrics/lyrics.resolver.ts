import { Args, Query, Resolver } from '@nestjs/graphql';
import { User } from '../auth/auth.decorator';
import { Lyrics } from '../models';
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
    return this.lyricsService.find(trackName, artist);
  }
}
