import { createStore, combineReducers } from 'redux';
import Reducer from './Actions';
import userReducer from './Actions';

const rootReducer = combineReducers({
  main:Reducer,
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;

