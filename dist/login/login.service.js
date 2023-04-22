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
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const spotify_web_api_node_1 = __importDefault(require("spotify-web-api-node"));
let LoginService = class LoginService {
    constructor(config) {
        this.clientId = null;
        this.spotifyKey = null;
        this.clientId = config.get('SPOTIFY_CLIENT_ID');
        this.spotifyKey = config.get('SPOTIFY_KEY');
        this.logger = new common_1.Logger();
    }
    async login(code) {
        try {
            const spotifyApi = new spotify_web_api_node_1.default({
                redirectUri: 'http://localhost:3001/Login',
                clientId: this.clientId,
                clientSecret: this.spotifyKey,
            });
            const response = await spotifyApi.authorizationCodeGrant(code);
            if (response.statusCode !== 200)
                return null;
            spotifyApi.setAccessToken(response.body.access_token);
            const user = await spotifyApi.getMe();
            if (user.statusCode !== 200)
                return null;
            return {
                accessToken: response.body.access_token,
                refreshToken: response.body.refresh_token,
                expiry: response.body.expires_in,
                isPremium: user.body.product === 'premium',
            };
        }
        catch (error) {
            this.logger.log(error === null || error === void 0 ? void 0 : error.message);
            return null;
        }
    }
    async refresh(refreshToken) {
        try {
            if (!refreshToken)
                return null;
            const spotifyApi = new spotify_web_api_node_1.default({
                redirectUri: 'http://localhost:3001/Login',
                clientId: this.clientId,
                clientSecret: this.spotifyKey,
                refreshToken,
            });
            const response = await spotifyApi.refreshAccessToken();
            if (response.statusCode !== 200)
                return null;
            return {
                accessToken: response.body.access_token,
                refreshToken: response.body.refresh_token,
                expiry: response.body.expires_in,
            };
        }
        catch (error) {
            this.logger.log(error === null || error === void 0 ? void 0 : error.message);
            return null;
        }
    }
};
LoginService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map