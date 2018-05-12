import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer, { initialState } from './components/EventCalendar/reducers/reducers';

const enhancers = [];

export default function storeCreate(history) {
    const middleware = [
        thunk,
        routerMiddleware(history)
    ];

    const composedEnhancers = compose(
        applyMiddleware(...middleware),
        ...enhancers
    );

    return createStore(
        rootReducer,
        initialState,
        composedEnhancers
    );
};
