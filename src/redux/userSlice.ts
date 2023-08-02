// src/redux/userSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthData } from '../services/auth';

interface UserState {
  userData: AuthData;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  userData: { userId: null, permissions: [] },
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthData>) => {
      state.userData = action.payload;
      state.isLoggedIn = action.payload.userId !== null;
    },
    clearUser: (state) => {
      state.userData = { userId: null, permissions: [] };
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
