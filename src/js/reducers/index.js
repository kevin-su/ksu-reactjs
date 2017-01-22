import { combineReducers } from 'redux';
import { items, isActive, showItem, itemsIsLoading, itemsFetchErrored } from './items';

export default combineReducers({
    items,
    isActive,
    showItem,
    itemsIsLoading,
    itemsFetchErrored
});
