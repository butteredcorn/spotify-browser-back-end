import { Query, Resolver } from '@nestjs/graphql';
import { Track } from 'src/models/tracks';
import { TracksService } from './tracks.service';

@Resolver(_for => Track)
export class TracksResolver {
  constructor(private tracksService: TracksService) {}
  @Query(_returns => [Track])
  tracks(): Promise<Track[]> {
    return this.tracksService.findAll();
  }
}
