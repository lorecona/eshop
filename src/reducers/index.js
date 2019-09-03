import { combineReducers } from 'redux'
import loggedInInfo from './loggedInInfo';
import shopItemsInfo from './shopItems';
import ordersInfo from './orders';
import promotionsInfo from './promotions';

export default combineReducers({
    loggedInInfo,
    shopItemsInfo,
    ordersInfo,
    promotionsInfo,
})