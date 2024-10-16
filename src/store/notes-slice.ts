import { createSlice } from "@reduxjs/toolkit";
import { NoteClass } from "../models/NoteClass";

import { removeNoteFromDB } from "./database/notes-manager";

const initialState = {
  AllNotes: [] as NoteClass[],
};

const notesSlice = createSlice({
  name: "stages",
  initialState,
  reducers: {
    addNote(state, action: { payload: NoteClass }) {
      const chosenNote = state.AllNotes.findIndex((note) => note.id === action.payload.id);
      if (chosenNote !== -1) state.AllNotes[chosenNote] = action.payload;
      if (chosenNote === -1) state.AllNotes = [...state.AllNotes, action.payload];

      state.AllNotes = state.AllNotes.sort((a, b) => +b.favorited - +a.favorited);


    },
    removeNote(state, action) {
      const chosenNote = state.AllNotes.findIndex((note) => note.id === action.payload);
      state.AllNotes.splice(chosenNote, 1);
      removeNoteFromDB(action.payload);
    },
  },
});

export const notesActions =  notesSlice.actions;
export const NotesReducer = notesSlice.reducer;
