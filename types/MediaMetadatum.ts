


export interface MediaMetadatum {
    url: string;
    format: Format;
    height: number;
    width: number;
}
export enum Format {
    MediumThreeByTwo210 = "mediumThreeByTwo210",
    MediumThreeByTwo440 = "mediumThreeByTwo440",
    StandardThumbnail = "Standard Thumbnail",
}