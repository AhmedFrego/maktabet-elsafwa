import { configureStore } from "@reduxjs/toolkit";
import { NotesReducer, searchReducer, statusReducer, modalReducer, historyReducer, reaservationReducer, userReducer } from "./";

const store = configureStore({
	reducer: {
		notes: NotesReducer,
		// authintication: authReducer,
		search: searchReducer,
		statusBar: statusReducer,
		modal: modalReducer,
		history: historyReducer,
		reservation: reaservationReducer,
		user: userReducer,
	},
	middleware: (x) => x({ serializableCheck: false }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
