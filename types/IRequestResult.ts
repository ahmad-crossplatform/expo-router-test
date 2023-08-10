import { INewsPost } from "./INewsPost";

export interface IRequestResult {
    status: string;
    copyright: string;
    num_results: number;
    results: INewsPost[];
}

