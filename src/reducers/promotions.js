const initialState = {
    promotions: null,
};

const promotionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PROMOTIONS_SUCCESS':
            return {
                ...state,
                promotions: action.payload,
            };
        default:
            return state;
    }
};

export default promotionsReducer;