import auth0 from 'auth0-js';

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: 'eventcalendar.eu.auth0.com',
        clientID: '7ncvdBeSNipKbT7tbVwruVVyPBUsh8n7',
        redirectUri: 'http://localhost:3000/callback',
        audience: 'https://eventcalendar.eu.auth0.com/userinfo',
        responseType: 'token id_token',
        scope: 'openid'
    });

    constructor(history) {
        this._history = history;
    }

    login = () => {
        this.auth0.authorize();
    };

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                this._history.replace('/');
            } else if (err) {
                this._history.replace('/');
                console.log(err);
            }
        });
    }

    setSession = (authResult) => {
        // Set the time that the Access Token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
    };

    logout = () => {
        // Clear Access Token and ID Token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // navigate to the home route
        this._history.replace('/logout');
    };

    isAuthenticated = () => {
        // Check whether the current time is past the
        // Access Token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    };
}
