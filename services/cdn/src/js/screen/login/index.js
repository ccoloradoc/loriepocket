import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise';
import { LoginForm } from 'authentication';

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

class Login extends Component {
  render() {
    return (
      <Provider store={createStoreWithMiddleware(reducers)}>
        <LoginForm/>
      </Provider>
    );
  }
}

ReactDOM.render(<Login />, document.querySelector('.workspace'));
