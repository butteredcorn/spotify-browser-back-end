import { Logger } from '@nestjs/common';
import { Lyrics } from '../models';
export declare class LyricsService {
    logger: Logger;
    constructor();
    find(trackName: any, artist: any): Promise<Lyrics>;
}
