import axios from 'axios';
import qs from 'qs';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Application from './components/app';
import { SigninScreen, SignoutScreen, SignupScreen, RequireAuth } from 'authentication';
import { configureSecuredAxios } from 'authentication/services';

import { AdminScreen } from 'screen';
import { Profile } from 'profile';

import { AUTH_USER } from 'authentication/actions';
import store from './store';

if(localStorage.getItem('token')) {
  store.dispatch({ type: AUTH_USER });
}

configureSecuredAxios(store);

class Login extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={Application}>

            <Route path="signin" component={SigninScreen} />
            <Route path="signout" component={SignoutScreen} />
            <Route path="signup" component={SignupScreen} />
            <Route path="profile" component={RequireAuth(Profile)} />
            <Route path="admin" component={RequireAuth(AdminScreen)} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

 // Ready
$( document ).ready(function(){
    $(".button-collapse").sideNav();
});

ReactDOM.render(<Login />, document.querySelector('.workspace'));

// <IndexRoute component={RequireAuth(AdminScreen)}/>
