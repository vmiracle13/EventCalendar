import React, { Component } from 'react';
import Type from 'prop-types';
import { connect } from 'react-redux';
import AppConnector from './../connector';

class Main extends Component {
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
                <AppConnector context={this.context.auth}/>
            </div>
        );
    }
}

Main.contextTypes = {
    auth: Type.object
};

export default connect()(Main);
