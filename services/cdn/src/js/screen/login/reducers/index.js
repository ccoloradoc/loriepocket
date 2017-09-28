import {combineReducers} from 'redux';
import { reducer as formReducer } from 'redux-form';
import { default as authenticationReducer, myselfReducer } from 'authentication/reducers';
import { userListReducer, userReducer, userFormReducer, rolesReducer, inviteListReducer } from 'admin/reducers';
import { mealListReducer, mealReducer, mealFormReducer, filterFormReducer } from 'user/reducers';
import { activeProfileReducer } from 'screen/reducers';
import { pageReducer } from 'commons/reducers';

const rootReducer = combineReducers({
    form: formReducer.plugin({
      UserForm: userFormReducer,
      MealForm: mealFormReducer,
      SearchBar: filterFormReducer
    }),
    auth: authenticationReducer,
    users: userListReducer,
    user: userReducer,
    roles: rolesReducer,
    invites: inviteListReducer,
    meals: mealListReducer,
    meal: mealReducer,
    me: myselfReducer,
    activeProfile: activeProfileReducer,
    page: pageReducer
});

export default rootReducer;
