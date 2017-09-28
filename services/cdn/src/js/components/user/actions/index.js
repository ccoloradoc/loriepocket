import axios from 'authentication/services';
import React, { Component } from 'react';
import qs from 'qs';

export const FETCH_MEALS = 'fetch_meals';
export const SELECT_MEAL = 'select_meal';
export const POST_MEAL = 'post_meal';
export const UPDATE_MEAL = 'update_meal';
export const DELETE_MEAL = 'delete_meal';
export const UPDATE_CONSUMED_DATE = 'update_consumed_date';
export const UPDATE_CONSUMED_DATE_TIME = 'update_consumed_date_time';
export const FILTER_DATE = 'filter_date';

export function fetchMeals(user, filter) {
  const url = user.links.find((link) => link.rel === 'meal').href;
  return function(dispatch) {
    axios.get(url + '?' + qs.stringify(filter))
      .then((response) => {
        dispatch({
          type: FETCH_MEALS,
          payload: response.data
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
}

export function selectMeal(meal) {
  return function(dispatch) {
    dispatch({
      type: SELECT_MEAL,
      payload: meal
    });
  }
}

export function saveMeal(meal, user, callback) {
  const url = user.links.find((link) => link.rel === 'meal').href;
  return function(dispatch) {
    axios.post(url, meal)
      .then((response) => {
        callback();
        dispatch({
          type: POST_MEAL,
          payload: response.data
        });
      });
  }
}

export function updateMeal(meal, user, callback) {
  const url = user.links.find((link) => link.rel === 'meal').href;
  delete meal['links']; //clean
  meal.consumedDate = new Date(meal.consumedDate);
  return function(dispatch) {
    axios.put(`${url}/${meal.id}`, meal)
      .then((response) => {
        callback();
        dispatch({
          type: UPDATE_MEAL,
          payload: response.data
        });
      });
  }
}

export function deleteMeal(meal, user) {
  const url = user.links.find((link) => link.rel === 'meal').href;
  return function(dispatch) {
    axios.delete(`${url}/${meal.id}`)
      .then((response) => {
        dispatch({
          type: DELETE_MEAL,
          payload: meal
        });
      });
  }
}

export function updateConsumedDate(date) {
  return function(dispatch) {
    dispatch({
      type: UPDATE_CONSUMED_DATE,
      payload: date
    })
  }
}

export function updateConsumedDateTime(date) {
  return function(dispatch) {
    dispatch({
      type: UPDATE_CONSUMED_DATE_TIME,
      payload: date
    })
  }
}

export function updateDate(date) {
  return function(dispatch) {
    dispatch({
      type: FILTER_DATE,
      payload: date
    });
  }
}
