const initialState = {
    orders: null,
    orderDetails: null,
    userOrders: null,
};

const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ORDERS_SUCCESS':
            return {
                ...state,
                orders: action.payload,
            };
        case 'GET_ORDER_DETAILS_SUCCESS':
            return {
                ...state,
                orderDetails: action.payload,
            };
        case 'GET_ORDERS_USER_SUCCESS':
            return {
                ...state,
                userOrders: action.payload,
            };
        default:
            return state;
    }
};

export default ordersReducer;