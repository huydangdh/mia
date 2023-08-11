// src/redux/userSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthData } from "../services/model/MMUser";

interface UserState {
  userData: AuthData;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  userData: { user: null, accessToken: "" },
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthData>) => {
      state.userData = action.payload;
      state.isLoggedIn = action.payload.user.id !== null;
    },
    clearUser: (state) => {
      state.userData = { user: null, accessToken: "" };
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
