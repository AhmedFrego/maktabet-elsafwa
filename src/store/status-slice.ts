import { createSlice } from "@reduxjs/toolkit";

export enum status {
  "GREEN",
  "RED",
  "BLUE",
}

const initialState = {
  status: status.BLUE,
  message: "",
  time: "",
};

const statusBarSlice = createSlice({
  name: "statusbar",
  initialState,
  reducers: {
    setStatus: (state, action: { payload: { status: status; message?: string; time?: string } }) => {
      state.status = action.payload.status;
      if (action.payload.message) state.message = action.payload.message;
      if (action.payload.time) state.time = action.payload.time;
    },
  },
});

export const statusReducer = statusBarSlice.reducer;
export const statusBarActions =  statusBarSlice.actions;
