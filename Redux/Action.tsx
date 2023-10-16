export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';

export const fetchPosts = () => ({
    type: FETCH_POSTS,
});

export const fetchPostsSuccess = (posts: any) => ({
    type: FETCH_POSTS_SUCCESS,
});

