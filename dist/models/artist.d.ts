import { Image } from './image';
export declare class Artist {
    id: string;
    name: string;
    href: string;
    uri: string;
    type: string;
    genres: string[];
    popularity: number;
    images?: Image[];
}
