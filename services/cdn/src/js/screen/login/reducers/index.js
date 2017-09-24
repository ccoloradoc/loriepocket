import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { default as authenticationReducer } from 'authentication/reducers';
import { default as adminReducer } from 'admin/reducers';

const rootReducer = combineReducers({
    form: formReducer,
    auth: authenticationReducer,
    users: adminReducer
});

export default rootReducer;
