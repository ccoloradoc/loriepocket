import React, { Component } from 'react';
import { FETCH_MEALS, FETCH_SUMMARY } from 'user/actions';
import { FETCH_USERS } from 'admin/actions';

export function pageReducer(state = { size: 10 }, action) {
  switch (action.type) {
    case FETCH_USERS:
    case FETCH_MEALS:
    case FETCH_SUMMARY:
      return { ...action.payload.page };
    default:
      return state;
  }
}
