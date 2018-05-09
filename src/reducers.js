import {
    OPEN_CREATE_EVENT_BLOCK,
    CLOSE_CREATE_EVENT_BLOCK,
    GET_EVENT_LIST,
    CHANGE_START,
    CHANGE_END,
    CHANGE_TITLE,
    SAVE_EVENT
} from './constants';

const initialState = {
    eventList: [],
    isCreateEventVisible: false,
    newEvent: {start: '08:00', end: '08:30'},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_CREATE_EVENT_BLOCK: {
            return {
                ...state,
                isCreateEventVisible: true
            }
        }

        case CLOSE_CREATE_EVENT_BLOCK: {
            return {
                ...state,
                isCreateEventVisible: false
            }
        }

        case GET_EVENT_LIST: {
            return {
                ...state,
                eventList: action.payload,
                isCreateEventVisible: false
            }
        }

        case CHANGE_START: {
            return {
                ...state,
                newEvent: {
                    ...state.newEvent,
                    start: action.payload
                }
            }
        }

        case CHANGE_END: {
            return {
                ...state,
                newEvent: {
                    ...state.newEvent,
                    end: action.payload
                }
            }
        }

        case CHANGE_TITLE: {
            return {
                ...state,
                newEvent: {
                    ...state.newEvent,
                    title: action.payload
                }
            }
        }

        case SAVE_EVENT: {
            return {
                ...state,
                newEvent: {}
            }
        }

        default:
            return state;
    }
};
