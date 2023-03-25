import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SpotifyWebApi from 'spotify-web-api-node';
import { isEmpty } from 'lodash';
import { Track } from 'src/models/track';

@Injectable()
export class TracksService {
  private readonly clientId: string = null;
  private readonly spotifyKey: string = null;
  logger: Logger;

  constructor(config: ConfigService) {
    this.clientId = config.get('SPOTIFY_CLIENT_ID');
    this.spotifyKey = config.get('SPOTIFY_KEY');
    this.logger = new Logger();
  }

  async findAll(accessToken, query): Promise<Track[]> {
    // simulate fetching from a db
    const spotifyApi = new SpotifyWebApi({
      redirectUri: 'http://localhost:3001/Login',
      clientId: this.clientId,
      clientSecret: this.spotifyKey,
      accessToken,
    });

    const response = await spotifyApi.searchTracks(query);

    const tracks = (response.body.tracks.items ?? [])
      .filter(t => t.album && !isEmpty(t.album.images))
      .map(
        t =>
          ({
            id: t.id,
            name: t.name,
            artists: t.artists.map(a => ({ id: a.id, name: a.name })),
            uri: t.uri,
            popularity: t.popularity,
            images: t.album.images, // track has own images, but only on another endpoint for spotify
            album: {
              id: t.album.id,
              name: t.album.name,
            },
          } as Track),
      );

    console.log(tracks);

    return tracks;
  }
}