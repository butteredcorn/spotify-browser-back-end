import { Album } from './album';
import { Artist } from './artist';
import { Image } from './image';
export declare class Track {
    id: string;
    name: string;
    href: string;
    uri: string;
    type: string;
    genres: string[];
    popularity: number;
    images?: Image[];
    album?: Album;
    artists?: Artist[];
}
