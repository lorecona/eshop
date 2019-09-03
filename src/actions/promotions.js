import axios from "axios";

export const getPromotions = () => async (dispatch) => {
    try {
        const response = await axios.get('http://localhost:3001/promotions');
        const promotions = response.data.promotions;

        dispatch(getPromotionsSuccess(promotions));
    }
    catch (e) {
        console.log(e);
    }
};

const getPromotionsSuccess = (payload) => {
    return {
        type: 'GET_PROMOTIONS_SUCCESS',
        payload: payload,
    }
};