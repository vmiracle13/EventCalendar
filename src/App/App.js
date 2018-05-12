import React, { Component } from 'react';
import Type from 'prop-types';
import { connect } from 'react-redux';
import EventCalendarConnector from './../connector';

class App extends Component {
    componentWillMount() {
        const { location } = this.props;

        if (!this.context.auth.isAuthenticated() && !(/\/callback/).test(location.pathname)) {
            this.context.auth.login();
        }
    }

    render() {
        const isAuthenticated = this.context.auth.isAuthenticated();

        if (!isAuthenticated) return null;

        return (
            <div className="main">
                <EventCalendarConnector context={this.context.auth}/>
            </div>
        );
    }
}

App.contextTypes = {
    auth: Type.object
};

export default connect()(App);
