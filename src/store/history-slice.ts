import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lastPage: "",
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    saveHistory(state, action) {
      state.lastPage = action.payload;
    },
  },
});

export const historyReducer = historySlice.reducer
export default historySlice.actions
