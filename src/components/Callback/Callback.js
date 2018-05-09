import React, { Component } from 'react';
import Type from 'prop-types';

class Callback extends Component {
    componentDidMount() {
        if (/access_token|id_token|error/.test(this.props.location.hash)) {
            this.context.auth.handleAuthentication();
        }
    }

    render() {
        return (
            <div className="callback">
                <img src='https://inlviv.in.ua/wp-content/themes/inlviv/images/loading_spinner.gif' alt="loading"/>
            </div>
        );
    }
}

Callback.contextTypes = {
    auth: Type.object
};

export default Callback;
