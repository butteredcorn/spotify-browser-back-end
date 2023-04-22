import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export interface SpotifyToken {
    accessToken: string;
    refreshToken: string;
    expiry: number;
}
export declare class LoginService {
    private readonly clientId;
    private readonly spotifyKey;
    logger: Logger;
    constructor(config: ConfigService);
    login(code: string): Promise<{
        accessToken: string;
        refreshToken: string;
        expiry: number;
        isPremium: boolean;
    }>;
    refresh(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        expiry: number;
    }>;
}
