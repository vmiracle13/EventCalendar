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

export const initialState = {
    eventList: [],
    isCreateEventVisible: false,
    newEvent: {start: '08:00', end: '08:01'},
};

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_CREATE_EVENT_BLOCK: {
            return {
                ...state,
                isCreateEventVisible: true,
                allEventList: null
            }
        }

        case CLOSE_CREATE_EVENT_BLOCK: {
            return {
                ...state,
                isCreateEventVisible: false,
                allEventList: null
            }
        }

        case GET_EVENT_LIST: {
            return {
                ...state,
                eventList: action.payload,
                isCreateEventVisible: false,
                allEventList: null
            }
        }

        case CHANGE_START: {
            return {
                ...state,
                allEventList: null,
                newEvent: {
                    ...state.newEvent,
                    start: action.payload
                }
            }
        }

        case CHANGE_END: {
            return {
                ...state,
                allEventList: null,
                newEvent: {
                    ...state.newEvent,
                    end: action.payload
                }
            }
        }

        case CHANGE_TITLE: {
            return {
                ...state,
                allEventList: null,
                newEvent: {
                    ...state.newEvent,
                    title: action.payload
                }
            }
        }

        case SAVE_EVENT: {
            return {
                ...state,
                allEventList: null,
                newEvent: {}
            }
        }

        case GET_ALL_EVENT_LIST: {
            return {
                ...state,
                allEventList: action.payload
            }
        }

        default:
            return state;
    }
};
