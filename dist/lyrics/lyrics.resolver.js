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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LyricsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../auth/auth.decorator");
const models_1 = require("../models");
const lyrics_service_1 = require("./lyrics.service");
let LyricsResolver = class LyricsResolver {
    constructor(lyricsService) {
        this.lyricsService = lyricsService;
    }
    async getLyrics(user, trackName, artist) {
        if (!user || !user.token)
            throw new common_1.UnauthorizedException();
        return this.lyricsService.find(trackName, artist);
    }
};
__decorate([
    (0, graphql_1.Query)(_returns => models_1.Lyrics),
    __param(0, (0, auth_decorator_1.User)()),
    __param(1, (0, graphql_1.Args)('trackName')),
    __param(2, (0, graphql_1.Args)('artist')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], LyricsResolver.prototype, "getLyrics", null);
LyricsResolver = __decorate([
    (0, graphql_1.Resolver)(_of => models_1.Lyrics),
    __metadata("design:paramtypes", [lyrics_service_1.LyricsService])
], LyricsResolver);
exports.LyricsResolver = LyricsResolver;
//# sourceMappingURL=lyrics.resolver.js.map