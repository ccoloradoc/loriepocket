import { ACTIVE_PROFILE } from '../actions';

export function activeProfileReducer(state = {}, action) {
  switch (action.type) {
    case ACTIVE_PROFILE:
      return action.payload;
    default:
      return state;
  }
}
