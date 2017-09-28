import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, AUTH_ERROR_CLEANUP, MYSELF } from '../actions';

export default function(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: true };
    case UNAUTH_USER:
      return { ...state, authenticated: false, message: action.payload || null };
    case AUTH_ERROR:
      return { ...state, message: action.payload };
    case AUTH_ERROR_CLEANUP:
        delete state['message'];
        return state;
    default:
      return state;
  }
}

export function myselfReducer(state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return action.payload;
    case MYSELF:
      return action.payload;
    default:
      return state;
  }
}
