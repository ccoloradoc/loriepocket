import axios from 'authentication/services';

export const ACTIVE_PROFILE = 'activeProfile';

export function setActiveProfile(userId) {
  return function(dispatch) {

    if(userId) {
      axios.get(`/api/user/${userId}`)
        .then((response) => {
          dispatch({
            type: ACTIVE_PROFILE,
            payload: response.data
          })
        })
    } else {
      axios.get('/auth/me')
        .then((response) => {
          dispatch({
            type: ACTIVE_PROFILE,
            payload: response.data
          })
        })
    }
  }
}
