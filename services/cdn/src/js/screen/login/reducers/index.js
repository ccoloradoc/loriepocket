import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { default as authenticationReducer } from 'authentication/reducers';
import { userListReducer, userReducer, userFormReducer, rolesReducer, inviteListReducer } from 'admin/reducers';

const rootReducer = combineReducers({
    form: formReducer.plugin({
      UserForm: userFormReducer
    }),
    auth: authenticationReducer,
    users: userListReducer,
    user: userReducer,
    roles: rolesReducer,
    invites: inviteListReducer
});

export default rootReducer;
