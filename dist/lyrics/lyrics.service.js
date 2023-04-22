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
exports.LyricsService = void 0;
const common_1 = require("@nestjs/common");
const cheerio_1 = require("cheerio");
const node_fetch_1 = __importDefault(require("node-fetch"));
let LyricsService = class LyricsService {
    constructor() {
        this.logger = new common_1.Logger();
    }
    async find(trackName, artist) {
        if (trackName === '' && artist === '')
            throw new common_1.BadRequestException();
        const [id, lyrics] = await getLyrics(trackName, artist);
        return { id, text: lyrics !== null && lyrics !== void 0 ? lyrics : 'No Lyrics Found' };
    }
};
LyricsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], LyricsService);
exports.LyricsService = LyricsService;
async function getLyrics(trackName, artist) {
    const url = 'https://genius.com/api/search/song?page=1&q=';
    const response = await (0, node_fetch_1.default)(`${url}${encodeURI(trackName + '+' + artist).replace(' ', '+')}`);
    const searchResult = await response.json();
    let id = null;
    let prefiltered = '';
    if (searchResult.response.sections[0].hits[0]) {
        id = searchResult.response.sections[0].hits[0].result.id;
        const response2 = await (0, node_fetch_1.default)('https://genius.com' +
            searchResult.response.sections[0].hits[0].result.path);
        const html = await response2.text();
        const elements = (0, cheerio_1.load)(html)('div[data-lyrics-container|=true]');
        if (elements.text()) {
            elements.each((_, elem) => {
                const text = (0, cheerio_1.load)((0, cheerio_1.load)(elem).html().replace(/<br>/gi, '\n')).text();
                prefiltered += `${text}\n`;
            });
        }
    }
    if (prefiltered === '')
        return [null, null];
    const filtered = prefiltered
        .split('\n')
        .filter(l => !l.match(/^\[\/.*|.*\]$/))
        .join('\n');
    return [id, filtered];
}
//# sourceMappingURL=lyrics.service.js.map