import React, { FormEvent } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import modalActions from "../../store/modal-slice";
import reservationActions from "../../store/reservation-slice";

import { ReservationClass } from "../../models/ReservationClass";

import { useInput } from "../../hooks/use-input";
import Input from "../Input";

import { getArabicNumbers } from "../../functions/getArabicNumbers";
import { circleXMark, plusCircle, minusCircle } from "../../assets/SVGs";
import { NoteClass } from "../../models/NoteClass";

import { addReservationToDB } from "../../store/database/reservations-manager";

import noteActions from "../../store/notes-slice";

const ReserveModal = () => {
  const dispatch = useDispatch();
  const temporarilyNotes = useSelector((state: RootState) => state.reservation.temporarilyNotes);
  const AllNotes = useSelector((state: RootState) => state.notes.AllNotes);

  const {
    blurHandler: nameBlurHandler,
    changeHandler: nameChangeHandler,
    focusHandler: nameFocusHandler,
    value: nameValue,
    isValid: nameIsValid,
    containerClass: nameContainerClass,
  } = useInput({ validate: (x: string) => x.trim().length > 0, className: "input" });

  const {
    blurHandler: paidBlurHandler,
    changeHandler: paidChangeHandler,
    focusHandler: paidFocusHandler,
    value: paidValue,
    containerClass: paidContainerClass,
    isValid: paidIsValid,
  } = useInput({ validate: (x: number) => x > 0, className: "input" });

  const {
    blurHandler: noteBlurHandler,
    changeHandler: noteChangeHandler,
    focusHandler: noteFocusHandler,
    value: noteValue,
    containerClass: noteContainerClass,
  } = useInput({ validate: () => true, className: "input" });

  const totalPrice = temporarilyNotes.map((item) => item.price * item.reserved).reduce((a, b) => a + b, 0);

  const reservationHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    nameBlurHandler();
    paidBlurHandler();
    noteBlurHandler();

    if (nameIsValid && paidIsValid && temporarilyNotes.length > 0) {
      const reserve = new ReservationClass(
        nameValue,
        temporarilyNotes,
        +paidValue,
        totalPrice - +paidValue,
        [...temporarilyNotes.map((note: NoteClass) => note.id)],
        noteValue
      );

      dispatch(reservationActions.addReservation(reserve));
      addReservationToDB(reserve);

      reserve.reservedNotes.forEach((note) => {
        const oldnote = AllNotes.filter((remainingNote) => note.id === remainingNote.id)[0];
        dispatch(noteActions.addNote({ ...note, reserved: oldnote.reserved + note.reserved }));
      });

      dispatch(reservationActions.endReserving());
      dispatch(modalActions.closeModel());
    }
  };

  const clearSubjectHandler = (item: NoteClass) => dispatch(reservationActions.handleTemporarilyItem({ ...item, reserved: 0 }));
  const removeTemporarilyItem = (item: NoteClass) => dispatch(reservationActions.handleTemporarilyItem({ ...item, reserved: -1 }));
  const addTemporarilyItem = (item: NoteClass) => dispatch(reservationActions.handleTemporarilyItem({ ...item, reserved: 1 }));

  return (
    <>
      {temporarilyNotes.length === 0 && <p className="reserving__total"> مفاضلش حاجة تتحجز يا بشمهندس 😹😹</p>}
      {temporarilyNotes.length > 0 && (
        <form onSubmit={reservationHandler}>
          <Input
            containerClass={nameContainerClass + " input--form"}
            inputClass="input__input"
            label="الإسم"
            labelClass="input__label"
            value={nameValue}
            changeHandler={nameChangeHandler}
            blurHandler={nameBlurHandler}
            focusHandler={nameFocusHandler}
            invalidText="بإسم مين طيب 😂😂  "
          />

          <span className="reserving__total"> {`الإجمالي ${getArabicNumbers(totalPrice)} جنيه`}</span>

          <Input
            containerClass={paidContainerClass + " input--form"}
            inputClass="input__input"
            label="المدفوع"
            labelClass="input__label"
            value={paidValue}
            changeHandler={paidChangeHandler}
            blurHandler={paidBlurHandler}
            focusHandler={paidFocusHandler}
            type="number"
            invalidText="لازم يدفع😈😈"
          />

          <span className="reserving__total"> {`الباقي ${getArabicNumbers(totalPrice - +paidValue)} جنيه`}</span>

          {temporarilyNotes.map((item) => {
            return (
              <div key={item.id} className="reserving__subject">
                <div className="reserving__subject-buttons">
                  <span
                    className="reserving__subject-button reserving__subject-button--plus"
                    onClick={addTemporarilyItem.bind(null, item)}
                  >
                    {plusCircle}
                  </span>
                  <span
                    className="reserving__subject-button reserving__subject-button--clear"
                    onClick={clearSubjectHandler.bind(null, item)}
                  >
                    {circleXMark}
                  </span>
                  <span
                    className="reserving__subject-button reserving__subject-button--minus"
                    onClick={removeTemporarilyItem.bind(null, item)}
                  >
                    {minusCircle}
                  </span>
                </div>
                <span className="reserving__subject-text"> {`${item.name} ${item.subStageText} - ${item.teacher}`}</span>
                <span className="reserving__subject-number"> {getArabicNumbers(item.reserved)}</span>
              </div>
            );
          })}

          <Input
            containerClass={noteContainerClass + " input--form input--big"}
            inputClass="input__input"
            label="ملاحظات"
            labelClass="input__label"
            value={noteValue}
            changeHandler={noteChangeHandler}
            blurHandler={noteBlurHandler}
            focusHandler={noteFocusHandler}
            tag="textarea"
          />

          <button className="btn--main btn" type="submit">
            حجز
          </button>
        </form>
      )}
    </>
  );
};

export default ReserveModal;
