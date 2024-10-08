import { createSlice } from "@reduxjs/toolkit";

export enum UserType {
  "GUEST",
  "USER",
  "ADMIN",
}

interface AuthValue {
  isLoggedIn: boolean;
  userLevel: UserType;
  token: string | null;
}

const initialState: AuthValue = {
  isLoggedIn: false,
  userLevel: UserType.ADMIN,
  token: null,
};
const authSlice = createSlice({
  name: "authintication",
  initialState,
  reducers: {
    logIn(state, action) {
      state.userLevel = action.payload.userLevel;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logOut(state) {
      state.userLevel = UserType.GUEST;
      state.token = null;
      state.isLoggedIn = false;
    },
  },
});

export default authSlice.actions;
export const authReducer = authSlice.reducer;
