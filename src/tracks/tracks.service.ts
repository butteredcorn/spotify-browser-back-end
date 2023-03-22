import { Injectable } from '@nestjs/common';
import { Track } from 'src/models/tracks';

@Injectable()
export class TracksService {
  async findAll(): Promise<Track[]> {
    return [];
  }
}
