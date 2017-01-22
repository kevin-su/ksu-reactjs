// import fetch from 'isomorphic-fetch';
import { getItemData } from 'services';

export function isActive(bool) {
    return {
        type: 'IS_ACTIVE',
        isActive: bool
    };
}

export function itemsFetchErrored(bool) {
    return {
        type: 'ITEMS_FETCH_ERRORED',
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}

export function showItem(item) {
    return {
        type: 'SHOW_ITEM',
        item
    };
}

export function getItem(index) {
    return (dispatch, getState) => {
        let state = getState();
        let item = {
            prevIndex: index - 1,
            nextIndex: index + 1,
            content: state.items.content[index]
        };

        if (item.prevIndex < 0) {
            item.prevIndex = -1;
        }

        if (item.nextIndex > state.total) {
            item.nextIndex = state.total;
        }

        dispatch(showItem(item));
    };
}

export function errorAfterFiveSeconds() {
    // We return a function instead of an action object
    return (dispatch) => {
        setTimeout(() => {
            // This function is able to dispatch other action creators
            dispatch(itemsHasErrored(true));
        }, 5000);
    };
}

export function itemsFetchData(callback) {
    return (dispatch) => {

        dispatch(itemsIsLoading(true));

        // console.log(getData());
        // getData();

        // fetch('/data/content.json')
        getItemData()
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(itemsIsLoading(false));
                return response;
            })
            .then((response) => response.json())
            .then((items) => {
                dispatch(itemsFetchDataSuccess(items));
                dispatch(getItem(0));
                dispatch(isActive(true));
            })
            .catch(() => dispatch(itemsFetchErrored(true)));
    };
}
