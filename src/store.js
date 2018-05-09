import {createStore, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk';
import eventApp from './reducers';

const store = createStore(eventApp, applyMiddleware(ReduxThunk));

export default store;
