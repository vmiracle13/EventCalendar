import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './styles/index.css';
import registerServiceWorker from './registerServiceWorker';
import AppConnector from './connector';
import store from './store';

const AppWrapper = () => {
    return (
        <div>
            <Provider store={store}>
                <AppConnector />
            </Provider>
        </div>
    );
};

ReactDOM.render(<AppWrapper/>, document.getElementById('root'));
registerServiceWorker();
