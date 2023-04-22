import { Image } from './image';
export declare class Album {
    id: string;
    name: string;
    href: string;
    uri: string;
    type: string;
    is_playable: boolean;
    total_tracks: number;
    release_date: string;
    images?: Image[];
}
