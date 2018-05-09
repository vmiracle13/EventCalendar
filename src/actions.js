import moment from 'moment';
import endpoint from './endpoint';
import {
    OPEN_CREATE_EVENT_BLOCK,
    CLOSE_CREATE_EVENT_BLOCK,
    GET_EVENT_LIST,
    CHANGE_START,
    CHANGE_END,
    CHANGE_TITLE,
    SAVE_EVENT,
    GET_ALL_EVENT_LIST
} from './constants';

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

export const getEventList = () => (dispatch) => {
    fetch(`${endpoint}/eventlist`)
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

export const removeEvent = (event) => (dispatch) => {
    fetch(`${endpoint}/event`, {
        method: 'DELETE',
        body: JSON.stringify(event),
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

export const saveEvent = (event) => (dispatch) => {
    const duration = getDiff(event.start, event.end);
    const start = getDiff('08:00', event.start);

    const eventItem = {
        title: event.title,
        duration,
        start
    };

    fetch(`${endpoint}/event`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify(eventItem),
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

export const getAllEventList = () => (dispatch) => {
    fetch(`${endpoint}/all`)
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

function getDiff(a, b) {
    const start = moment(a, 'HH:mm');
    const finish = moment(b, 'HH:mm');
    const diff = moment.duration(start - finish, "minutes");
    return (diff.toString().match(/\d+/i) / 1000);
}
