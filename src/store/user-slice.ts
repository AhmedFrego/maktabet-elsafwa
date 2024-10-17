import { createSlice } from "@reduxjs/toolkit";
import { type User, type WeakPassword, type Session } from "@supabase/supabase-js";

export interface UserDataInterface {
	user: User | null;
	session: Session | null;
	weakPassword?: WeakPassword | null;
}

const initialState: UserDataInterface & { isLoggedIn: boolean } = {
	session: null,
	user: null,
	weakPassword: null,
	isLoggedIn: false,
};
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logIn(state, action: { payload: UserDataInterface }) {
			state = { ...state, ...action.payload, isLoggedIn: !!action.payload.user };
			return state;
		},
		logout() {
			return initialState;
		},
	},
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
