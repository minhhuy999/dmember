import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import { FETCH_POSTS, fetchPostsSuccess } from './Action';
import { getPosts } from './api';

const fetchPostsEpic = (action$: any) =>

    action$.pipe(
        ofType(FETCH_POSTS),
        mergeMap(async (action) => {
            try {
                const response = await getPosts();
                return fetchPostsSuccess(response);
            } catch (error) {
                console.error('Error fetching posts:', error);
                // You might want to dispatch an error action here as well
                // Example: return { type: 'FETCH_POSTS_ERROR', payload: error };
                throw error; // Rethrow the error to maintain the observable chain
            }
        })
    );

export default fetchPostsEpic;
