import { FETCH_MEALS, UPDATE_MEAL, POST_MEAL, DELETE_MEAL, SELECT_MEAL, FETCH_SUMMARY, FETCH_DAY_SUMMARY, CLEAN_DAY_SUMMARY,
  UPDATE_CONSUMED_DATE, UPDATE_CONSUMED_DATE_TIME, FILTER_DATE, ACTIVE_PROFILE, UPDATE_MEALS_FILTER } from '../actions';

export function activeProfileReducer(state = {}, action) {
  switch (action.type) {
    case ACTIVE_PROFILE:
      return action.payload;
    default:
      return state;
  }
}

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

export function filterFormReducer(state = {}, action) {
  switch(action.type) {
    // Allow to update hidden field
    case FILTER_DATE:
    const oldStartDate = state.values ? state.values.startDate : '';
    const oldEndDate = state.values ? state.values.endDate: '';
    return {
        ...state,
        values: {
          ...state.values,
          startDate: action.payload.startDate || oldStartDate ,
          endDate: action.payload.endDate || oldEndDate
        }
      };
    break;
    default:
      return state;
  }
}

export function filterReducer(state = { size: 10 }, action) {
  switch (action.type) {
    case UPDATE_MEALS_FILTER:
      return { ...state, ...action.payload  };
      break;
    default:
      return state;
  }
}

/* SUMMARY */

export function summaryReducer(state = [], action) {
  switch (action.type) {
    case FETCH_SUMMARY:
      return action.payload.content;
    default:
      return state;
  }
}

export function summaryDetailReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_DAY_SUMMARY:
      return {...state, [action.payload.date] : action.payload.data.content};
    case CLEAN_DAY_SUMMARY:
      if(!action.payload)
        return {};
      delete state[action.payload];
      return { ...state };
    default:
      return state;
  }
}
