const initialState = {
    userInfo: null,
};

const loggedInInfoReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN_USER':
            return {
                ...state,
                userInfo: action.payload,
            };
        case 'LOG_OUT_USER':
            return {
                ...state,
                userInfo: null,
            };
        case 'UPDATE_USER':
            return {
                ...state,
                userInfo: action.payload,
            };
        default:
            return state;
    }
}

export default loggedInInfoReducer