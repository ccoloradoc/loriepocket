import { FETCH_MEALS, UPDATE_MEAL, POST_MEAL, DELETE_MEAL, SELECT_MEAL, UPDATE_CONSUMED_DATE, UPDATE_CONSUMED_DATE_TIME } from '../actions';

export function mealListReducer(state = null, action) {
  switch (action.type) {
    case FETCH_MEALS:
      return _.mapKeys(action.payload.content, 'id');
    case POST_MEAL:
      state[action.payload.id] = action.payload;
      return { ...state };
    case UPDATE_MEAL:
      state[action.payload.id] = action.payload;
      return { ...state };
    case DELETE_MEAL:
      delete state[action.payload.id];
      return { ...state };
    default:
      return state;
  }
}

export function mealReducer(state = null, action) {
  switch (action.type) {
    case SELECT_MEAL:
      if(action.payload == null)
        return null;
      return {...action.payload };
      break;
    default:
      return state;
  }
}

export function mealFormReducer(state, action) {
  switch(action.type) {
    // Allow to update hidden field
    case UPDATE_CONSUMED_DATE:
     return {
          ...state,
          values: {
            ...state.values,
            consumedDateDate: action.payload
          }
        };
    break;
    case UPDATE_CONSUMED_DATE_TIME:
      return {
           ...state,
           values: {
             ...state.values,
             consumedDateTime: action.payload
           }
         };
    default:
      return state;
  }
}
