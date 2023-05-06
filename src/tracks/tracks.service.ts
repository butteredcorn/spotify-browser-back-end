import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import SpotifyWebApi from 'spotify-web-api-node';
import { isEmpty } from 'lodash';
import { Track } from '../models/track';

@Injectable()
export class TracksService {
  TRACKS_RETURN_LIMIT = 28;
  private readonly clientId: string = null;
  private readonly spotifyKey: string = null;
  private readonly spotifyRedirectUri: string = null;
  logger: Logger;

  constructor(config: ConfigService) {
    this.clientId = config.get('SPOTIFY_CLIENT_ID');
    this.spotifyKey = config.get('SPOTIFY_KEY');
    this.spotifyRedirectUri = config.get('SPOTIFY_REDIRECT_URI');
    this.logger = new Logger();
  }

  // offset allows the fetch of the next set of results
  async findAll(accessToken, query, offset = 0): Promise<Track[]> {
    const spotifyApi = new SpotifyWebApi({
      redirectUri: this.spotifyRedirectUri,
      clientId: this.clientId,
      clientSecret: this.spotifyKey,
      accessToken,
    });

    // simulate fetching from a db
    const response = await spotifyApi.searchTracks(query, {
      limit: this.TRACKS_RETURN_LIMIT,
      offset: offset,
    });

    // from pseudo db to dto
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

    return tracks;
  }
}
