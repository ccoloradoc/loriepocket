import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { default as authenticationReducer } from 'authentication/reducers';
import { userListReducer, userReducer, userFormReducer, rolesReducer } from 'admin/reducers';

const rootReducer = combineReducers({
    form: formReducer.plugin({
      UserForm: userFormReducer
    }),
    auth: authenticationReducer,
    users: userListReducer,
    user: userReducer,
    roles: rolesReducer
});

export default rootReducer;
