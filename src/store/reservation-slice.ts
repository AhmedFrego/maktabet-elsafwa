import { createSlice } from "@reduxjs/toolkit";
import { NoteClass } from "../models/NoteClass";
import { ReservationClass } from "../models/ReservationClass";
import { addReservationToDB, deletReservationFromDB } from "./database/reservations-manager";

interface reservationType {
  reaservations: ReservationClass[];
  temporarilyNotes: NoteClass[];
  reservedNotes: any;
}

const initialState: reservationType = {
  reaservations: [],
  temporarilyNotes: [],
  reservedNotes: [],
};

const reaservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    endReserving(state) {
      state.temporarilyNotes = [];
    },
    handleTemporarilyItem(state, action: { payload: NoteClass }) {
      const isReserved = state.temporarilyNotes.findIndex((note) => note.id === action.payload.id);
      const note = state.temporarilyNotes[isReserved];
      if (!note) state.temporarilyNotes.push(action.payload);
      if (note && note.reserved !== 0) state.temporarilyNotes[isReserved].reserved += action.payload.reserved;
      if (note && note.reserved === 0) state.temporarilyNotes.splice(isReserved, 1);
      if (action.payload.reserved === 0) state.temporarilyNotes.splice(isReserved, 1);
    },
    addReservation(state, action: { payload: ReservationClass }) {
      state.reaservations.push(action.payload);

      action.payload.reservedNotes.forEach((note) => {
        const isReserved = state.reservedNotes.findIndex((oldNote: NoteClass) => oldNote.id === note.id);
        const oldNote = state.reservedNotes[isReserved];
        oldNote ? (state.reservedNotes[isReserved].reserved += note.reserved) : state.reservedNotes.push(note);
        // addReservationToDB(action.payload);
      });
    },
    removeReservation(state, action: { payload }) {
      const isReserved = state.reaservations.findIndex((reserve) => reserve.id === action.payload);

      deletReservationFromDB(action.payload);

      state.reaservations[isReserved].reservedNotes.forEach((noteNReservation) => {
        const reservedNote = state.reservedNotes.findIndex((noteNReserved: NoteClass) => noteNReserved.id === noteNReservation.id);
        const theNote = state.reservedNotes[reservedNote];
        theNote.reserved -= noteNReservation.reserved;
        if (theNote.reserved === 0) state.reservedNotes.splice(reservedNote, 1);
      });

      if (isReserved !== -1) {
        state.reaservations.splice(isReserved, 1);
      }
    },
  },
});

export const reaservationReducer = reaservationSlice.reducer;
export default reaservationSlice.actions;
