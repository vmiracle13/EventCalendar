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

import generateEventGrid from '../selectors/selectors';

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
                eventList: generateEventGrid(action.payload),
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
                newEvent: {},
                incorrectDurationInterval: false,
                emptyTitle: false
            }
        }

        case GET_ALL_EVENT_LIST: {
            return {
                ...state,
                allEventList: action.payload
            }
        }

        case IS_INCORRECT_DURATION: {
            return {
                ...state,
                incorrectDurationInterval: true,
                isCreateEventVisible: true
            }
        }

        case IS_EMPTY_TITLE: {
            return {
                ...state,
                emptyTitle: true,
                isCreateEventVisible: true
            }
        }

        default:
            return state;
    }
};
