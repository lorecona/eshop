import axios from "axios";

export const getOrders = (getParams = {}) => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:3001/orders', { params: getParams });
        const orders = response.data.orders;

        dispatch(getOrdersSuccess(orders));
    }
    catch (e) {
        console.log(e);
    }
};

const getOrdersSuccess = (payload) => {
    return {
        type: 'GET_ORDERS_SUCCESS',
        payload: payload,
    }
};


export const markCompleted = (id = null) => async (dispatch) => {
    try {
        await axios.post(`http://localhost:3001/orders/${id}`);
        dispatch(getOrderDetails(id));
    }
    catch (e) {
        console.log(e);
    }
};


export const getOrderDetails = ( id = null) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3001/orders/${id}`);

        const order = response.data.order;

        dispatch(getOrderDetailsSuccess(order));
    }
    catch (e) {
        console.log(e);
    }
};

const getOrderDetailsSuccess = (payload) => {
    return {
        type: 'GET_ORDER_DETAILS_SUCCESS',
        payload: payload,
    }
};

export const getOrdersForUser = ( id = null) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3001/orders/user/${id}`);
        const orders = response.data.orders;

        dispatch(getOrdersForUserSuccess(orders));
    }
    catch (e) {
        console.log(e);
    }
};

const getOrdersForUserSuccess = (payload) => {
    return {
        type: 'GET_ORDERS_USER_SUCCESS',
        payload: payload,
    }
};
