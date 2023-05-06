import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SpotifyWebApi from 'spotify-web-api-node';
import { AuthService } from 'src/auth/auth.service';

export interface SpotifyToken {
  accessToken: string;
  refreshToken: string;
  expiry: number;
}

@Injectable()
export class LoginService {
  private readonly clientId: string = null;
  private readonly spotifyKey: string = null;
  private readonly redirectUri: string = null;
  logger: Logger;
  constructor(config: ConfigService, private authService: AuthService) {
    this.clientId = config.get('SPOTIFY_CLIENT_ID');
    this.spotifyKey = config.get('SPOTIFY_KEY');
    this.redirectUri = config.get('SPOTIFY_REDIRECT_URI');
    this.logger = new Logger(LoginService.name);
  }

  async login(code: string) {
    try {
      const spotifyApi = new SpotifyWebApi({
        redirectUri: this.redirectUri,
        clientId: this.clientId,
        clientSecret: this.spotifyKey,
      });

      const response = await spotifyApi.authorizationCodeGrant(code);
      if (response.statusCode !== 200) return null;
      spotifyApi.setAccessToken(response.body.access_token);
      const user = await spotifyApi.getMe();
      if (user.statusCode !== 200) return null;
      return {
        accessToken: response.body.access_token,
        refreshToken: response.body.refresh_token,
        expiry: response.body.expires_in,
        isPremium: user.body.product === 'premium',
        jwtToken: await this.authService.sign(response.body.access_token),
      };
    } catch (error) {
      this.logger.error(error?.message);
      return null;
    }
  }

  async refresh(refreshToken: string) {
    try {
      if (!refreshToken) return null;

      const spotifyApi = new SpotifyWebApi({
        redirectUri: this.redirectUri,
        clientId: this.clientId,
        clientSecret: this.spotifyKey,
        refreshToken,
      });

      const response = await spotifyApi.refreshAccessToken();
      if (response.statusCode !== 200) return null;
      return {
        accessToken: response.body.access_token,
        refreshToken: response.body.refresh_token,
        expiry: response.body.expires_in,
        jwtToken: await this.authService.sign(response.body.access_token),
      };
    } catch (error) {
      this.logger.error(error?.message);
      return null;
    }
  }
}
