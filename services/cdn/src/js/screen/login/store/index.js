import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import promise from 'redux-promise';
import reducers from '../reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

export default store;
