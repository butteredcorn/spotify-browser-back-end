import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { load } from 'cheerio';
import { Lyrics } from 'src/models';
import fetch from 'node-fetch';

@Injectable()
export class LyricsService {
  logger: Logger;

  constructor() {
    this.logger = new Logger();
  }

  async find(trackName, artist): Promise<Lyrics> {
    if (trackName === '' && artist === '') throw new BadRequestException();
    const [id, lyrics] = await getLyrics(trackName, artist);
    return { id, text: lyrics ?? 'No Lyrics Found' } as Lyrics;
  }
}

// web scraping for demo purposes only
async function getLyrics(trackName: string, artist: string) {
  const url = 'https://genius.com/api/search/song?page=1&q=';

  const response = await fetch(
    `${url}${encodeURI(trackName + '+' + artist).replace(' ', '+')}`,
  );

  const searchResult = await response.json();

  let id = null;
  let prefiltered = '';

  if (searchResult.response.sections[0].hits[0]) {
    id = searchResult.response.sections[0].hits[0].result.id;
    const response2 = await fetch(
      'https://genius.com' +
        searchResult.response.sections[0].hits[0].result.path,
    );

    const html = await response2.text();

    const elements = load(html)('div[data-lyrics-container|=true]');

    if (elements.text()) {
      elements.each((_, elem) => {
        const text = load(load(elem).html().replace(/<br>/gi, '\n')).text();
        prefiltered += `${text}\n`;
      });
    }
  }

  if (prefiltered === '') return [null, null];

  const filtered = prefiltered
    .split('\n')
    .filter(l => !l.match(/^\[\/.*|.*\]$/))
    .join('\n');

  return [id, filtered];
}
