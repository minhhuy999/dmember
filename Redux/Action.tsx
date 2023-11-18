export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const API_NEW = 'API_NEW'
export const API_NEW_SUCCESS = 'API_NEW_SUCCESS';

export const fetchPosts = () => ({
    type: FETCH_POSTS,
});

export const fetchPostsSuccess = (posts: any) => ({
    type: FETCH_POSTS_SUCCESS,
    payload: posts,
});

export const getnew= ()=>({
    type: API_NEW
})

export const getnewSuccess = (apinew:any)=>({
    type: API_NEW_SUCCESS,
    payload: apinew,
})
