// store.js
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import userReducer from './useReducer';

const rootReducer = combineReducers({
  // Thêm tên của reducer và state tương ứng ở đây
  user: userReducer,
});

const store = createStore(rootReducer);

export default store;

