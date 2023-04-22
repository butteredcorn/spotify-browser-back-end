import { Track } from '../models/track';
import { TracksService } from './tracks.service';
export declare class TracksResolver {
    private tracksService;
    constructor(tracksService: TracksService);
    getTracks(user: any, query: string, offset: number): Promise<Track[]>;
}
