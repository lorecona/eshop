const initialState = {
    shopItems: null,
    distributors: null,
    categories:null,
    itemDetails:null,
};

const shopItemsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ITEMS_SUCCESS':
            return {
                ...state,
                shopItems: action.payload ? action.payload.items : null,
                distributors: action.payload ? action.payload.distributors : null,
            };
        case 'GET_CATEGORIES_SUCCESS':
            return {
                ...state,
                categories: action.payload,
            };
        case 'GET_DETAILS_SUCCESS':
            return {
                ...state,
                itemDetails: action.payload,
            };
        default:
            return state;
    }
};

export default shopItemsReducer;