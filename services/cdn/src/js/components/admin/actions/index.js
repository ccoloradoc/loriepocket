import axios from 'authentication/services';
import React, { Component } from 'react';

export const FETCH_USERS = 'fetch_users';
export const FETCH_USER = 'fetch_user';
export const UPDATE_USER = 'update_user';
export const UPDATE_USER_ROLE = 'update_user_role';
export const DELETE_USER = 'delete_user';
export const FETCH_ROLES = 'fetch_roles';
export const SELECT_USER = 'select_user';
export const FETCH_INVITES = 'fetch_invites';
export const POST_INVITE = 'post_invite';
export const DELETE_INVITE = 'delete_invite';

export function fetchUsers() {
  return function(dispatch) {
    axios.get('/api/user')
      .then((response) => {
        dispatch({
          type: FETCH_USERS,
          payload: response.data
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
}

export function fetchUser(userId) {
  return function(dispatch) {
    axios.get(`/api/user/${userId}`)
      .then((response) => {
        dispatch({
          type: SELECT_USER,
          payload: response.data
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
}

export function selectUser(user) {
  return function(dispatch) {
    dispatch({
      type: SELECT_USER,
      payload: user
    });
  }
}

export function updateUser(user, callback) {
  return function(dispatch) {
    axios.put(`/api/user/${user.id}`, user)
      .then((response) => {
        if(callback) callback();
        dispatch({
          type: UPDATE_USER,
          payload: response.data
        });
      });
  }
}

export function deleteUser(user) {
  return function(dispatch) {
    axios.delete(`/api/user/${user.id}`, user)
      .then((response) => {
        dispatch({
          type: DELETE_USER,
          payload: user
        });
      });
  }
}

export function fetchRoles() {
  return function(dispatch) {
    axios.get('/api/role')
      .then((response) => {
        dispatch({
          type: FETCH_ROLES,
          payload: response.data
        });
      });
  }
}

export function updateRole(payload) {
  return function(dispatch) {
    dispatch({
      type: UPDATE_USER_ROLE,
      payload: payload
    })
  }
}

export function fetchInvites() {
  return function(dispatch){
    axios.get('/api/invite')
      .then((response) => {
        dispatch({
          type: FETCH_INVITES,
          payload: response.data
        });
      });
  }
}

export function sendInvite(invite, callback) {
  return function(dispatch){
    axios.post('/api/invite', invite)
      .then((response) => {
        callback();
        dispatch({
          type: POST_INVITE,
          payload: response.data
        });
      });
  }
}

export function deleteInvite(invite) {
  return function(dispatch){
    axios.delete(`/api/invite/${invite.id}`)
      .then((response) => {
        dispatch({
          type: DELETE_INVITE,
          payload: invite
        });
      });
  }
}
