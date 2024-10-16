import { createSlice } from "@reduxjs/toolkit";

interface initialStateType {
  showModal: boolean;
  modalContent: null | (new () => React.Component<any, any>);
}

const initialState: initialStateType = {
  showModal: false,
  modalContent: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModel(state, action) {
      state.showModal = true;
      state.modalContent = action.payload;
    },
    closeModel(state) {
      state.showModal = false;
      state.modalContent = null;
    },
  },
});

export const modalReducer = modalSlice.reducer;
export const modalActions =  modalSlice.actions;
