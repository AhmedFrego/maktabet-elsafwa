import { configureStore } from "@reduxjs/toolkit";
import { NotesReducer } from "./notes-slice";
import { authReducer } from "./auth-slice";
import { searchReducer } from "./search-slice";
import { statusReducer } from "./status-slice";
import { modalReducer } from "./modal-slice";
import { historyReducer } from "./history-slice";
import { reaservationReducer } from "./reservation-slice";

const store = configureStore({
  reducer: {
    notes: NotesReducer,
    authintication: authReducer,
    search: searchReducer,
    statusBar: statusReducer,
    modal: modalReducer,
    history: historyReducer,
    reservation: reaservationReducer,
    
  },
  middleware: (x) => x({ serializableCheck: false }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
