import { Lyrics } from '../models';
import { LyricsService } from './lyrics.service';
export declare class LyricsResolver {
    private lyricsService;
    constructor(lyricsService: LyricsService);
    getLyrics(user: any, trackName: string, artist: string): Promise<Lyrics>;
}
