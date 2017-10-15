import axios from 'authentication/services';
import React, { Component } from 'react';
import moment from 'moment';
import qs from 'qs';

export const FETCH_MEALS = 'fetch_meals';
export const SELECT_MEAL = 'select_meal';
export const POST_MEAL = 'post_meal';
export const UPDATE_MEAL = 'update_meal';
export const DELETE_MEAL = 'delete_meal';
export const UPDATE_CONSUMED_DATE = 'update_consumed_date';
export const UPDATE_CONSUMED_DATE_TIME = 'update_consumed_date_time';
export const FILTER_DATE = 'filter_date';
export const ACTIVE_PROFILE = 'active_profile';
export const UPDATE_PROFILE = 'update_profile';
export const FETCH_SUMMARY = 'fetch_summary';
export const FETCH_DAY_SUMMARY = 'fetch_day_summary';
export const CLEAN_DAY_SUMMARY = 'clean_day_summary';
export const UPDATE_MEALS_FILTER = 'update_meals_filter';

export function setActiveProfile(userId, filter) {
  return function(dispatch) {
    const request = [];
    dispatch({ type: ACTIVE_PROFILE, payload: {} });
    dispatch({ type: FETCH_MEALS, payload: [] });
    dispatch({ type: FETCH_SUMMARY, payload: { content: [] } });
    dispatch({ type: CLEAN_DAY_SUMMARY});
    if(userId) {
      request.push(axios.get(`/api/user/${userId}`));
      request.push(axios.get(`/api/user/${userId}/meal` + '?' + qs.stringify(filter)));
      request.push(axios.get(`/api/user/${userId}/summary` + '?' + qs.stringify(filter)));
    } else {
      let id = localStorage.getItem('userId');
      request.push(axios.get('/auth/me'));
      request.push(axios.get(`/api/user/${id}/meal` + '?' + qs.stringify(filter)));
      request.push(axios.get(`/api/user/${id}/summary` + '?' + qs.stringify(filter)));
    }

    Promise.all(request).then(response => {
      dispatch({
        type: ACTIVE_PROFILE,
        payload: response[0].data
      });

      dispatch({
        type: FETCH_MEALS,
        payload: response[1].data
      });

      dispatch({
        type: FETCH_SUMMARY,
        payload: response[2].data
      });
    });
  }
}

export function updateUser(user, callback) {
  return function(dispatch) {
    axios.put(`/api/user/${user.id}`, user)
      .then((response) => {
        if(callback) callback();
        dispatch({
          type: UPDATE_PROFILE,
          payload: response.data
        });
      });
  }
}


export function fetchMeals(user, filter) {
  const url = user.links.find((link) => link.rel === 'meal').href;
  return function(dispatch) {
    axios.get(url + '?' + qs.stringify(filter))
      .then((response) => {
        dispatch({
          type: FETCH_MEALS,
          payload: response.data
        });
        dispatch({
          type: UPDATE_MEALS_FILTER,
          payload: filter
        })
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
        const date = moment(response.data.consumedDate).format("YYYY-MM-DD");
        callback(date);
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
        const date = moment(response.data.consumedDate).format("YYYY-MM-DD");
        callback(date);
        dispatch({
          type: UPDATE_MEAL,
          payload: response.data
        });
      });
  }
}

export function deleteMeal(meal, user, callback) {
  const url = user.links.find((link) => link.rel === 'meal').href;
  return function(dispatch) {
    axios.delete(`${url}/${meal.id}`)
      .then((response) => {
        const date = moment(meal.consumedDate).format("YYYY-MM-DD");
        callback(date);
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

export function fetchSummary(id, filter) {
  return function(dispatch) {
    axios.get(`/api/user/${id}/summary` + '?' + qs.stringify(filter))
    .then((response) => {
      dispatch({
        type: FETCH_SUMMARY,
        payload: response.data
      })
    });
  }
}

export function fetchDayDetails(userId, consumedDate) {
    const date = moment(consumedDate).format("YYYY-MM-DD");
    return function(dispatch) {
      axios.get(`/api/user/${userId}/day/${date}/summary`)
      .then((response) => {
        dispatch({
          type: FETCH_DAY_SUMMARY,
          payload: {
            date: date,
            data: response.data
          }
        })
      });
    }
}

export function cleanDayDetails(consumedDate) {
  return function(dispatch) {
    dispatch({
      type: CLEAN_DAY_SUMMARY,
      payload: consumedDate
    })
  }
}
