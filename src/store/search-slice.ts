import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
  noItems: false,
};

const searchSlice = createSlice({
  name: "searchInput",
  initialState,
  reducers: {
    valueHandler: (state, actions) => {
      state.value = actions.payload;
    },
    noItemsHandler: (state, actions: { payload: boolean }) => {
      actions.payload ? (state.noItems = true) : (state.noItems = false);
    },
    resetValue: (state) => {
      state.value = "";
    },
  },
});

export const searchReducer = searchSlice.reducer;
export default searchSlice.actions;
