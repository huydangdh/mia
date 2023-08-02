// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';


 // Truy cập vào localStorage
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Truy cập vào localStorage

const persistConfig = {
  key: 'root',
  storage,
};
 // end : Truy cập vào localStorage

const store = configureStore({
  reducer: {
    user: userReducer,
    // Add other reducers here if needed
  },
});

export default store;
