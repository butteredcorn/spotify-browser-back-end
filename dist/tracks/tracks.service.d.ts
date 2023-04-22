import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Track } from '../models/track';
export declare class TracksService {
    TRACKS_RETURN_LIMIT: number;
    private readonly clientId;
    private readonly spotifyKey;
    private readonly spotifyRedirectUri;
    logger: Logger;
    constructor(config: ConfigService);
    findAll(accessToken: any, query: any, offset?: number): Promise<Track[]>;
}
