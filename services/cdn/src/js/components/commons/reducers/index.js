import React, { Component } from 'react';
import { FETCH_MEALS } from 'user/actions';
import { FETCH_USERS } from 'admin/actions';

export function pageReducer(state = { size: 10 }, action) {
  switch (action.type) {
    case FETCH_USERS:
    case FETCH_MEALS:
      return { ...action.payload.page };
    default:
      return state;
  }
}
