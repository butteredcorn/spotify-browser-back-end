"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TracksService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
const lodash_1 = require("lodash");
let TracksService = class TracksService {
    constructor(config) {
        this.TRACKS_RETURN_LIMIT = 28;
        this.clientId = null;
        this.spotifyKey = null;
        this.spotifyRedirectUri = null;
        this.clientId = config.get('SPOTIFY_CLIENT_ID');
        this.spotifyKey = config.get('SPOTIFY_KEY');
        this.spotifyRedirectUri = config.get('SPOTIFY_REDIRECT_URI');
        this.logger = new common_1.Logger();
    }
    async findAll(accessToken, query, offset = 0) {
        var _a;
        const spotifyApi = new spotify_web_api_node_1.default({
            redirectUri: this.spotifyRedirectUri,
            clientId: this.clientId,
            clientSecret: this.spotifyKey,
            accessToken,
        });
        const response = await spotifyApi.searchTracks(query, {
            limit: this.TRACKS_RETURN_LIMIT,
            offset: offset,
        });
        const tracks = ((_a = response.body.tracks.items) !== null && _a !== void 0 ? _a : [])
            .filter(t => t.album && !(0, lodash_1.isEmpty)(t.album.images))
            .map(t => ({
            id: t.id,
            name: t.name,
            artists: t.artists.map(a => ({ id: a.id, name: a.name })),
            uri: t.uri,
            popularity: t.popularity,
            images: t.album.images,
            album: {
                id: t.album.id,
                name: t.album.name,
            },
        }));
        return tracks;
    }
};
TracksService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], TracksService);
exports.TracksService = TracksService;
//# sourceMappingURL=tracks.service.js.map