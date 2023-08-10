import { SortType, periodAtom, sortAtom } from '@/atoms/filterAtoms';
import { newsPostsAtom } from '@/atoms/newsAtoms';
import { INewsPost } from '@/types/INewsPost';
import { IRequestResult } from '@/types/IRequestResult';
import { useAtom } from 'jotai';
import moment from 'moment';
import { useEffect, useState } from 'react';

interface GroupUnit {
    title: string;
    data: INewsPost[];
}

const useNewsPosts = () => {
    const [newsPosts, setNewsPosts] = useAtom(newsPostsAtom);
    const [foundPosts, setFoundPosts] = useState<INewsPost[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [period] = useAtom(periodAtom)
    const [sortType] = useAtom(sortAtom)
    const fetchNewsPosts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://api.nytimes.com/svc/mostpopular/v2/viewed/${period}.json?api-key=${process.env.EXPO_PUBLIC_NEWS_API_KEY}`
            );
            if (!response.ok) {
                console.log('Failed to fetch news posts');
                throw new Error('Failed to fetch news posts');
            }
            else {
                const data: IRequestResult = await response.json();
                console.log(data.results.length);
                setNewsPosts(data.results);
                setFoundPosts(data.results);
            }
        } catch (error: any) {
            setError(error.message);
        }
        setIsLoading(false);
    };

    useEffect(() => {

        fetchNewsPosts();
    }, [period]);




    useEffect(() => {
        sort();
    }, [sortType])

    const getNewsPostById = (id: number) => {
        return newsPosts.find((post) => post.id === id);
    };

    const refreshNewsPosts = async () => {
        await fetchNewsPosts();
    };

    // create a function that groups the news posts by date and returns an object with the date as the key and the news posts as the value of type GroupUnit
    function groupByPublishedDate(): Record<string, INewsPost[]> {
        const grouped: Record<string, INewsPost[]> = {};

        for (const post of foundPosts) {
            if (!post.updated) continue;

            const publishedDateKey = moment(post.updated).format("YYYY-MM-DD").toString().split('T')[0];


            if (!grouped[publishedDateKey]) {
                grouped[publishedDateKey] = [];
            }

            grouped[publishedDateKey].push(post);
        }

        return grouped;
    }
    function convertToGroupUnit(groupedNews: Record<string, INewsPost[]>): GroupUnit[] {
        const newTypeArray: GroupUnit[] = [];

        for (const publishedDate in groupedNews) {
            if (groupedNews.hasOwnProperty(publishedDate)) {
                newTypeArray.push({
                    title: publishedDate,
                    data: groupedNews[publishedDate],
                });
            }
        }

        return newTypeArray.sort((a, b) => {
            return sortType == SortType.Ascending ? new Date(b.title).getTime() - new Date(a.title).getTime() : new Date(a.title).getTime() - new Date(b.title).getTime();
        });
    }

    function sort() {
        setFoundPosts(foundPosts.sort((a, b) => {
            return sortType == SortType.Ascending ? new Date(b.updated).getTime() - new Date(a.updated).getTime() : new Date(a.updated).getTime() - new Date(b.updated).getTime();
        }))
    }

    function search(searchText: string) {
        setFoundPosts(newsPosts.filter((post) => {
            return post.title.toLowerCase().includes(searchText.toLowerCase());
        }))
    }
    return { foundPosts, isLoading, error, refreshNewsPosts, groupByPublishedDate, convertToGroupUnit, search, sort, getNewsPostById };
};

export default useNewsPosts;
