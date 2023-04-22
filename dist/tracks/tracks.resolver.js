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
exports.TracksResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const auth_decorator_1 = require("../auth/auth.decorator");
const track_1 = require("../models/track");
const tracks_service_1 = require("./tracks.service");
let TracksResolver = class TracksResolver {
    constructor(tracksService) {
        this.tracksService = tracksService;
    }
    async getTracks(user, query, offset) {
        if (!user || !user.token)
            throw new common_1.UnauthorizedException();
        return this.tracksService.findAll(user.token, query, offset);
    }
};
__decorate([
    (0, graphql_1.Query)(_returns => [track_1.Track]),
    __param(0, (0, auth_decorator_1.User)()),
    __param(1, (0, graphql_1.Args)('query')),
    __param(2, (0, graphql_1.Args)('offset', { defaultValue: 0 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Number]),
    __metadata("design:returntype", Promise)
], TracksResolver.prototype, "getTracks", null);
TracksResolver = __decorate([
    (0, graphql_1.Resolver)(_of => track_1.Track),
    __metadata("design:paramtypes", [tracks_service_1.TracksService])
], TracksResolver);
exports.TracksResolver = TracksResolver;
//# sourceMappingURL=tracks.resolver.js.map