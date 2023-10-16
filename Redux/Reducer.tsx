import { FETCH_POSTS_SUCCESS } from "./Action";

const initialState = {
    posts: [],
};

const Reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                posts: action.payload, 
            };
        default:
            return state;
    }
};


export default Reducer;
