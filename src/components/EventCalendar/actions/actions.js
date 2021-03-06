import moment from 'moment';
import endpoint from '../../../endpoint';
import {
    OPEN_CREATE_EVENT_BLOCK,
    CLOSE_CREATE_EVENT_BLOCK,
    GET_EVENT_LIST,
    CHANGE_START,
    CHANGE_END,
    CHANGE_TITLE,
    SAVE_EVENT,
    GET_ALL_EVENT_LIST,
    IS_INCORRECT_DURATION,
    IS_EMPTY_TITLE
} from '../constants/constants';

const jwtDecode = require('jwt-decode');

export const openCreateEventBlock = () => {
    return {
        type: OPEN_CREATE_EVENT_BLOCK
    };
};

export const closeCreateEventBlock = () => {
    return {
        type: CLOSE_CREATE_EVENT_BLOCK
    }
};

export const changeStart = (payload) => {
    return {
        type: CHANGE_START,
        payload
    };
};

export const changeEnd = (payload) => {
    return {
        type: CHANGE_END,
        payload
    };
};

export const changeTitle = (payload) => {
    return {
        type: CHANGE_TITLE,
        payload
    };
};

export const incorrectDuration = () => ({type: IS_INCORRECT_DURATION});

export const isEmptyTitle = () => ({type: IS_EMPTY_TITLE});

export const getEventList = () => (dispatch) => {
    fetch(`${endpoint}/eventlist`, {
        method: 'GET',
        headers: {
            'Authorization': getUserData(),
        }
    })
        .then((response) => {
            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            return response.json();
        })
        .then((data) => {
            dispatch({type: GET_EVENT_LIST, payload: data});
        })
        .catch(err => console.log(err));
};

export const saveEvent = (event) => (dispatch) => {
    const today = moment().format('YYYY-MM-DD');

    const eventToSave = {
        title: event.title,
        start: `${today}T${event.start}`,
        end: `${today}T${event.end}`
    };

    fetch(`${endpoint}/event`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({...eventToSave, user: getUserData()}),
    })
        .then((response) => {
            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            dispatch({type: SAVE_EVENT});
            dispatch(getEventList());
        })
        .catch((err) => {
            console.log(err);
        });
};

export const removeEvent = (event) => (dispatch) => {
    fetch(`${endpoint}/event`, {
        method: 'DELETE',
        body: JSON.stringify({...event, user: getUserData()}),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })
        .then((response) => {
            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            return response;
        })
        .then(() => dispatch(getEventList()))
        .catch((err) => {
            console.log(err);
        });
};

export const getAllEventList = () => (dispatch) => {
    fetch(`${endpoint}/all`, {
        method: 'GET',
        headers: {
            'Authorization': getUserData(),
        }
    })
        .then((response) => {
            if (response.status !== 200) {
                throw Error(response.statusText);
            }

            return response.json();
        })
        .then((data) => {
            dispatch({type: GET_ALL_EVENT_LIST, payload: data});
        })
        .catch(err => console.log(err));
};

const getUserData = () => {
    const token = localStorage.getItem('id_token');
    return jwtDecode(token).sub.slice(6);
};
