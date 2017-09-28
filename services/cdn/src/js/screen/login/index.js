import axios from 'axios';
import qs from 'qs';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Application from './components/app';
import { SigninScreen, SignoutScreen, SignupScreen, RequireAuth } from 'authentication';
import { configureSecuredAxios } from 'authentication/services';

import { AdminScreen, ManagerScreen, ProfileScreen } from 'screen';

import { AUTH_USER, MYSELF } from 'authentication/actions';
import store from './store';

configureSecuredAxios(store);

import securedConnection from 'authentication/services';

if(localStorage.getItem('token')) {
  store.dispatch({
    type: AUTH_USER,
    payload: localStorage.getItem('user')
  });
}

class Login extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={Application}>
            <IndexRoute component={SigninScreen}/>
            <Route path="signin" component={SigninScreen} />
            <Route path="signout" component={SignoutScreen} />
            <Route path="signup" component={SignupScreen} />
            <Route path="profile" component={RequireAuth(ProfileScreen)}>
              <Route path=":id" component={RequireAuth(ProfileScreen)}/>
            </Route>
            <Route path="admin" component={RequireAuth(AdminScreen)} />
            <Route path="manager" component={RequireAuth(ManagerScreen)} />
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
