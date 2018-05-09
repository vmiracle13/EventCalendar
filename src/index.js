import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import Type from 'prop-types';
import createHistory from 'history/createBrowserHistory';
import Callback from './components/Callback/Callback';
import Main from './Main/Main';
import createStore from './store';
import Auth from './services/Auth';
import './styles/index.css';

const history = createHistory();
const auth = new Auth(history);
const store = createStore(history);

class ContextProvider extends Component {
    static childContextTypes = {
        auth: Type.object,
    };
    static propTypes = {
        children: Type.object
    };
    getChildContext() {
        return {
            auth
        };
    }

    render() {
        return this.props.children;
    }
}

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <ContextProvider>
                <div>
                    <Route path='/' component={Main} />
                    <Route exact path='/callback' component={Callback} />
                </div>
            </ContextProvider>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
