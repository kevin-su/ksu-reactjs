export function isActive(state = false, action) {
    switch (action.type) {
        case 'IS_ACTIVE':
            return action.isActive;
        default:
            return state;
    }
}

export function itemsFetchErrored(state = false, action) {
    switch (action.type) {
        case 'ITEMS_FETCH_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

export function itemsIsLoading(state = false, action) {
    switch (action.type) {
        case 'ITEMS_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}

export function showItem(state = {}, action) {
    switch (action.type) {
        case 'SHOW_ITEM':
            return action.item;
        default:
            return state;
    }
}

export function items(state = {}, action) {
    switch (action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return action.items;
        default:
            return state;
    }
}
