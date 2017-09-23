import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import reduxThunk from 'redux-thunk';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import Application from './components/app';
import { SigninScreen, SignoutScreen, SignupScreen, RequireAuth } from 'authentication';
import { Profile } from 'profile';

import reducers from './reducers';

import { AUTH_USER } from 'authentication/actions';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

if(localStorage.getItem('token')) {
  store.dispatch({ type: AUTH_USER });
}

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
          </Route>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<Login />, document.querySelector('.workspace'));
