import { browserHistory } from 'react-router';
import axios from 'axios';
import securedConnection from 'authentication/services';
import qs from 'qs';

export const AUTH_USER = 'auth_user';
export const UNAUTH_USER = 'unauth_user';
export const AUTH_ERROR = 'auth_error';
export const AUTH_ERROR_CLEANUP = 'auth_error_cleanup';
export const MYSELF = 'myself';

const AUTH_SIGNIN_URL = '/auth/login';
const AUTH_SIGNUP_URL = '/auth/signup';

export function singin(credentials) {

  return function(dispatch) {
    axios.post(AUTH_SIGNIN_URL, qs.stringify(credentials))
      .then((response) => {
        // Save jwt token
        localStorage.setItem('token', response.data.access_token);
        // Alter state to indicate user has logged in
        securedConnection.get('/auth/me').then(({data}) => {
          // Save user
          localStorage.setItem('user', data);
          // Save user authorities
          localStorage.setItem('authorities', data.authorities.map((auth) => auth.name ));
          dispatch({
            type: AUTH_USER,
            payload: data
          });
        });
        // Forward to profile
        browserHistory.push('/profile');
      })
      .catch(() => {
          // Alter state to indicate user has logged out
          dispatch({ type: AUTH_ERROR, payload: { text: 'Username/Password is invalid.', type: 'danger'} });
      });
  }
}

export function signup(credentials) {
  return function(dispatch) {
    axios.post(AUTH_SIGNUP_URL, qs.stringify(credentials))
      .then((response) => {
        dispatch({ type: AUTH_ERROR, payload: { text: 'You have been registered successfully!', type: 'info' } });
        // Forward to profile
        browserHistory.push('/signin?success=true');
      })
      .catch((error) => {
        if (error.response) {
          dispatch({ type: AUTH_ERROR, payload: { text: error.response.data.message, type: 'danger' } });
        } else {
          // Alter state to indicate user has logged out
          dispatch({ type: AUTH_ERROR, payload: { text: 'Could not register new user.', type: 'danger' } });
        }
      });
  }
}

export function signout(message) {
  return function(dispatch) {
    // Remove token from session
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('authorities');
    // Forward to signin
    browserHistory.push('/signin' + (message ? '?msg=true' : ''));
    // Update auth state
    dispatch({ type: UNAUTH_USER, payload: message });
  }
}

export function clearAuthError() {
  return { type: AUTH_ERROR_CLEANUP };
}


export function findMyself(callback) {
  return function(dispatch) {
    securedConnection.get('/auth/me')
      .then((response) => {
        if(callback) callback(reponse.data);
        dispatch({
          type: MYSELF,
          payload: response.data
        })
      })
  }
}
