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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Track = void 0;
const graphql_1 = require("@nestjs/graphql");
const album_1 = require("./album");
const artist_1 = require("./artist");
const image_1 = require("./image");
let Track = class Track {
};
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Track.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Track.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Track.prototype, "href", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Track.prototype, "uri", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Track.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(_type => [String]),
    __metadata("design:type", Array)
], Track.prototype, "genres", void 0);
__decorate([
    (0, graphql_1.Field)(_type => graphql_1.Int),
    __metadata("design:type", Number)
], Track.prototype, "popularity", void 0);
__decorate([
    (0, graphql_1.Field)(_type => [image_1.Image]),
    __metadata("design:type", Array)
], Track.prototype, "images", void 0);
__decorate([
    (0, graphql_1.Field)(_type => album_1.Album),
    __metadata("design:type", album_1.Album)
], Track.prototype, "album", void 0);
__decorate([
    (0, graphql_1.Field)(_type => [artist_1.Artist]),
    __metadata("design:type", Array)
], Track.prototype, "artists", void 0);
Track = __decorate([
    (0, graphql_1.ObjectType)()
], Track);
exports.Track = Track;
//# sourceMappingURL=track.js.map