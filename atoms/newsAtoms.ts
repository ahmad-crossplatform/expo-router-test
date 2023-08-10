import { atomWithAsyncStorage } from "@/helpers/atomWithAsyncStorage";
import { INewsPost } from "@/types/INewsPost";

export const newsPostsAtom = atomWithAsyncStorage<INewsPost[]>("news", []); 