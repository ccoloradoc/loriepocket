import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, AUTH_ERROR_CLEANUP } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, message: action.payload };
    case AUTH_ERROR_CLEANUP:
        delete state['message'];
        return state;
    default:
      return state;
  }
}
