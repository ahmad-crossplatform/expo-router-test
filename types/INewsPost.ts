
import { Media } from "./Media";


export interface INewsPost {
    uri: string;
    url: string;
    id: number;
    asset_id: number;
    source: Source;
    published_date: Date;
    updated: Date;
    section: string;
    subsection: string;
    nytdsection: string;
    adx_keywords: string;
    column: null;
    byline: string;
    type: ResultType;
    title: string;
    abstract: string;
    des_facet: string[];
    org_facet: string[];
    per_facet: string[];
    geo_facet: string[];
    media: Media[];
    eta_id: number;
}


export enum Source {
    NewYorkTimes = "New York Times",
}

export enum ResultType {
    Article = "Article",
    Interactive = "Interactive",
}
