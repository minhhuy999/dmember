import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import { FETCH_POSTS, fetchPostsSuccess} from './Action';
import { getPosts } from './api';

const fetchPostsEpic = (action$: any) =>

    action$.pipe(
        ofType(FETCH_POSTS),
        mergeMap(async () => {
            try {
                const response = await getPosts();
                return fetchPostsSuccess(response);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        })
    );

export default [fetchPostsEpic];
