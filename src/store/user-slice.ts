import { createSlice } from "@reduxjs/toolkit";
import { type User as userType, type WeakPassword as WeakPasswordType, type Session as SessionType } from "@supabase/supabase-js";

export interface userDataInterface {
	user: userType | null;
	session: SessionType | null;
	weakPassword?: WeakPasswordType | null;
}

const initialState: userDataInterface & { isLoggedIn: boolean } = {
	session: null,
	user: null,
	weakPassword: null,
	isLoggedIn: false,
};
const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		logIn(state, action: { payload: userDataInterface }) {
			state = { ...state, ...action.payload, isLoggedIn: !!action.payload.user };
			return state;
		},
	},
});

export const userActions = userSlice.actions;
export const userReducer = userSlice.reducer;
