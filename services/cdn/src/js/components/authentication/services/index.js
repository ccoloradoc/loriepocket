import axios from 'axios';
import { browserHistory } from 'react-router';
import { signout } from  '../actions';
const axiosJwt = axios.create();

export function configureSecuredAxios(store) {
  // Adding authorization token to all request
  axiosJwt.interceptors.request.use(config => {
    return { ...config, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }  };
  });

  // Configuring interceptor to refresh token if posible
  axiosJwt.interceptors.response.use(undefined, (error) => {
    const originalRequest = error.config;
    console.log(error.response);
    if ( error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const token = window.localStorage.getItem('token');
      // Use normal axios in order to avoid using interceptors
      return axios.get('/auth/refresh', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        .then(({data}) => {
          // Token was refreshed successfully
          console.log('interceptor', data);
          localStorage.setItem('token', data.token);
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
          originalRequest.headers['Authorization'] = 'Bearer ' + data.token;
          return axios(originalRequest);
        })
        .catch(error => {
          store.dispatch(signout({
            text: 'Your session has expired!',
            type: 'danger'
          }));
          // // Could not refresh token
          // console.log('Could not refresh token');
          // // Remove token from session
          // localStorage.removeItem('token');
          // // Update auth state
          // store.dispatch({ type: UNAUTH_USER });
          // // Display message
          // store.dispatch({ type: AUTH_ERROR, payload: {
          //   text: 'Your session has expired!',
          //   type: 'danger'
          // }});
          // // Forward to signin
          // browserHistory.push('/signin?msg=true');
        });
    } else {
        return Promise.reject(error);
    }
  });
}

export default axiosJwt;
