import {
  FETCH_USERS, SELECT_USER, UPDATE_USER, UPDATE_USER_ROLE, DELETE_USER,
  FETCH_ROLES, FETCH_INVITES, POST_INVITE, DELETE_INVITE } from '../actions';

function updateRole(roles, role) {
  if(roles.some(currentRole => currentRole.authority == role.name )) {
    return  roles.filter( currentRole => currentRole.authority != role.name )
  } else {
    roles.push(role);
  }
  return roles;
}

export function userListReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_USERS:
      return _.mapKeys(action.payload.content, 'id');
    case UPDATE_USER:
      state[action.payload.id] = action.payload;
      return { ...state };
    case DELETE_USER:
      delete state[action.payload.id];
      return { ...state };
    default:
      return state;
  }
}

export function userReducer(state = null, action) {
  switch (action.type) {
    case SELECT_USER:
      if(action.payload == null)
        return null;
      return {...action.payload };
      break;
    default:
      return state;
  }
}

export function userFormReducer(state, action) {
  switch(action.type) {
    // Allow to update hidden field
    case UPDATE_USER_ROLE:
     const authorities = updateRole(state.values.authorities, action.payload.role);
     delete state.values['authorities'];
     return {
          ...state,
          values: {
            ...state.values,
            authorities
          }
        };
    break;
    default:
      return state;
  }
}

export function rolesReducer(state = [], action) {
  switch (action.type) {
    case FETCH_ROLES:
      return action.payload;
    default:
      return state;
  }
}

export function inviteListReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_INVITES:
      return _.mapKeys(action.payload, 'id');
    case POST_INVITE:
      state[action.payload.id] = action.payload;
      return { ...state };
    case DELETE_INVITE:
      delete state[action.payload.id];
      return { ...state };
    default:
      return state;
  }
}
