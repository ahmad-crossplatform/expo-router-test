import { MediaMetadatum } from "./MediaMetadatum";



export interface Media {
    type: MediaType;
    subtype: Subtype;
    caption: string;
    copyright: string;
    approved_for_syndication: number;
    "media-metadata": MediaMetadatum[];
}


export enum Subtype {
    Empty = "",
    Photo = "photo",
}

export enum MediaType {
    Image = "image",
}

