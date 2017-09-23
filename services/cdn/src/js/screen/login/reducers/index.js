import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { default as authenticationReducer } from 'authentication/reducers';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authenticationReducer
});

export default rootReducer;
