import axios from 'authentication/services';

export const ACTIVE_PROFILE = 'active_profile';
export const FETCH_MEALS = 'fetch_meals';

export function setActiveProfile(userId) {
  return function(dispatch) {
    const request = [];
    dispatch({ type: ACTIVE_PROFILE, payload: {} });
    dispatch({ type: FETCH_MEALS, payload: [] });

    if(userId) {
      request.push(axios.get(`/api/user/${userId}`));
      request.push(axios.get(`/api/user/${userId}/meal`));
    } else {
      let id = localStorage.getItem('userId');
      request.push(axios.get('/auth/me'));
      request.push(axios.get(`/api/user/${id}/meal`));
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
    });
  }
}
