import { FC, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import notesActions from "../store/notes-slice";
import reservationActions from "../store/reservation-slice";
import modalActions from "../store/modal-slice";

import EditeNoteModal from "./UI/EditeNoteModal";

import { getArabicNumbers } from "../functions/getArabicNumbers";

import {  NoteClass, SubStage } from "../models/NoteClass";

import { plusCircle, minusCircle, penEdit, heart, angleLeft, angleRight } from "../assets/SVGs";
import { RootState } from "../store/store";

import { noteManager } from "../store/database/notes-manager";
import React from "react";

const Note: FC<{ note: NoteClass }> = ({ note }) => {
  const dispatch = useDispatch();
  const noteData = useSelector((state: RootState) => state.notes.AllNotes).filter((item) => item.id === note.id)[0];
  const reserving = useSelector((state: RootState) => state.reservation.temporarilyNotes);
  let reservingNumber = 0;

  reserving.forEach((item) => (item.id === note.id ? (reservingNumber = item.reserved) : null));

  const heartHandler = () => dispatch(notesActions.addNote({ ...note, favorited: !note.favorited }));
  const incrementAvailableHandler = () => dispatch(notesActions.addNote({ ...note, printed: note.printed + 1 }));
  const decrementAvailableHandler = () => note.printed > 0 && dispatch(notesActions.addNote({ ...note, printed: note.printed - 1 }));

  const addTemporarilyItem = () => dispatch(reservationActions.handleTemporarilyItem({ ...note, reserved: 1 }));

  const removeTemporarilyItem = () => reservingNumber && dispatch(reservationActions.handleTemporarilyItem({ ...note, reserved: -1 }));

  let classHandler = "note ";
  if (reservingNumber > 0) classHandler += " note--reserving ";
  if (noteData.favorited) classHandler += " note--favorited ";
  if (noteData.reserved > 0) classHandler += " note--reserved ";

  const editNoteHandler = () => dispatch(modalActions.showModel(EditeNoteModal.bind(null, { note })));

  useEffect(() => {
    noteManager(note);
  }, [noteData, note]);

  return (
    <div className={classHandler}>
      <img src={note.cover} alt={note.name} className="note__img" />
      <div className="note__buttons">
        <div>
          <button className="note__button" onClick={addTemporarilyItem}>
            {plusCircle}
          </button>
          <button className="note__button" onClick={editNoteHandler}>
            {penEdit}
          </button>
          <button className={noteData.favorited ? "note__button note__button--favorited" : "note__button"} onClick={heartHandler}>
            {heart}
          </button>
          <button className="note__button" onClick={removeTemporarilyItem}>
            {minusCircle}
          </button>
        </div>
        <div className="note__buttons--actions">
          <button className="note__button" onClick={incrementAvailableHandler}>
            {angleRight}
          </button>
          <span className="note__copies">{`جاهز ( ${getArabicNumbers(noteData.printed)} )`}</span>
          <button className="note__button" onClick={decrementAvailableHandler}>
            {angleLeft}
          </button>
        </div>
      </div>
      {(reservingNumber > 0 || noteData.reserved > 0) && (
        <h4 className="note__reserved">
          {reservingNumber > 0 ? " جاري حجز " : "مطلوب"} ( {getArabicNumbers(reservingNumber || noteData.reserved)} ){" "}
        </h4>
      )}

      <h4 className="heading--forth">{note.name + " " + (note.subStage !== SubStage.collage ? note.subStageText : "")}</h4>
      <span className="paragraph paragraph--default paragraph--bold"> {note.teacher} </span>
      <span className="paragraph paragraph--default paragraph--bold"> {note.year} </span>
      <span className="note__price">{getArabicNumbers(note.price)} </span>
    </div>
  );
};

export default Note;
