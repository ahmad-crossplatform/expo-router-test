import { atomWithAsyncStorage } from "@/helpers/atomWithAsyncStorage";
import { atom } from "jotai";

export enum Period {
    Day = 1,
    Week = 7,
    Month = 30
}

export enum SortType {
    Ascending = "asc",
    Descending = "desc"
}
export const periodAtom = atomWithAsyncStorage("Period", Period.Month);
export const sortAtom = atomWithAsyncStorage("SortType", SortType.Ascending);