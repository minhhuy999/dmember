import { API_NEW_SUCCESS, FETCH_POSTS_SUCCESS } from "./Action";

const initialState = {
    posts: [],
    apinew: [],
};

const Reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload,
            };
        case API_NEW_SUCCESS:
            return {
                ...state,
                apinew: action.payload,
            };
        default:
            return state;
    }
};


export default Reducer;
