import 'isomorphic-fetch';

const FETCH_LIST_REQUEST = 'FETCH_LIST_REQUEST';
const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS';
const FETCH_LIST_FAILURE = 'FETCH_LIST_FAILURE';

const FETCH_ITEM_REQUEST = 'FETCH_ITEM_REQUEST';
const FETCH_ITEM_SUCCESS = 'FETCH_ITEM_SUCCESS';
const FETCH_ITEM_FAILURE = 'FETCH_ITEM_FAILURE';

const FETCH_URL = !isBROWSER ? `${SERVER_HOST}:${SERVER_PORT}/` : '/';

export default function reducer(state = {}, action) {
    switch (action.type) {
        case FETCH_LIST_SUCCESS:
            return Object.assign({}, state, { list: action.list });

        case FETCH_ITEM_SUCCESS:
            return Object.assign({}, state, { item: action.item });

        default:
            return state;
    }
}

const requestList = () => ({ type: FETCH_LIST_REQUEST });
const receivedList = list => ({ type: FETCH_LIST_SUCCESS, list });
const failedList = (err) => ({ type: FETCH_LIST_FAILURE, err });

export const fetchList = (query) => (dispatch) => {
    dispatch(requestList());

    return fetch(`${FETCH_URL}${API_ENDPOINT}?q=${ query }`)
    .then(res => res.json())
    .then(list => dispatch(receivedList(list)))
    .catch(err => dispatch(failedList(err)));
};

const requestItem = () => ({ type: FETCH_ITEM_REQUEST });
const receivedItem = item => ({ type: FETCH_ITEM_SUCCESS, item });
const failedItem = (err) => ({ type: FETCH_ITEM_FAILURE, err });

export const fetchItem = (id) => (dispatch) => {
    dispatch(requestItem());

    return fetch(`${FETCH_URL}${API_ENDPOINT}/${ id }`)
    .then(res => res.json())
    .then(item => dispatch(receivedItem(item)))
    .catch(err => dispatch(failedItem(err)));
};
