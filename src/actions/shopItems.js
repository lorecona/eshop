import axios from 'axios';

export const getShopItems = (getParams = {}) => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:3001/shop', { params: getParams });
        const items = response.data.items;
        let distributors = [];

        for(let i = 0; i < items.length; i++){
            if(! distributors.find(distributor => distributor === items[i].distributor)){
                distributors.push(items[i].distributor);
            }
        }
        const payload = {
            items,
            distributors,
        };
        dispatch(getItemsSuccess(payload));
    }
    catch (e) {
        console.log(e);
    }
};

const getItemsSuccess = (payload) => {
    return {
        type: 'GET_ITEMS_SUCCESS',
        payload: payload,
    }
};

export const getCategories = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:3001/categories');
        const categories = response.data.categories;

        dispatch(getCategoriesSuccess(categories));
    }
    catch (e) {
        console.log(e);
    }
};

const getCategoriesSuccess = (payload) => {
    return {
        type: 'GET_CATEGORIES_SUCCESS',
        payload: payload,
    }
};

export const getItemDetails = ( id = null) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:3001/shop/${id}`);
        const item = response.data.item;

        dispatch(getDetailsSuccess(item));
    }
    catch (e) {
        console.log(e);
    }
};

const getDetailsSuccess = (payload) => {
    return {
        type: 'GET_DETAILS_SUCCESS',
        payload: payload,
    }
};