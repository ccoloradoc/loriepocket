import axios from 'authentication/services';
import React, { Component } from 'react';

export const FETCH_USERS = 'fetch_users';

export function fetchUsers() {
  return function(dispatch) {
    axios.get('/api/user/all')
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
