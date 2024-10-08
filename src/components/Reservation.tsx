import React, { FC, useEffect, useState } from "react";
import { ReservationClass } from "../models/ReservationClass";
import { check, crossxmark } from "../assets/SVGs";

import { getArabicNumbers } from "../functions/getArabicNumbers";
import { useDispatch, useSelector } from "react-redux";
import reservationActions from "../store/reservation-slice";
import notesActions from "../store/notes-slice";

import { getArabicDate } from "../functions/getArabicDate";

import { addReservationToDB } from "../store/database/reservations-manager";
import { RootState } from "../store/store";

const Reservation: FC<ReservationClass> = (props) => {
  const dispatch = useDispatch();
  const [Notedone, setNoteDone] = useState<string[]>(props.notesIds ? [...props.notesIds] : []);
  const [stepAhead, setStepAhead] = useState(false);

  const allNotes = useSelector((state: RootState) => state.notes.AllNotes);

  const markNoteDone = (id: string) =>
    Notedone.includes(id) ? setNoteDone((perv) => perv.filter((ids) => ids !== id)) : setNoteDone((perv) => [...perv, id]);

  useEffect(() => {
    addReservationToDB({ ...props, notesIds: [...Notedone] });
  }, [Notedone]);

  const removeReservationHandler = () => {
    if (Notedone.length === 0 || stepAhead) {
      dispatch(reservationActions.removeReservation(props.id));

      props.reservedNotes.forEach((note) => {
        const oldNote = allNotes.find((x) => x.id === note.id);

        dispatch(
          notesActions.addNote({
            ...oldNote!,
            printed: oldNote!.printed - note.reserved > 0 ? oldNote!.printed - note.reserved : 0,
            reserved: oldNote!.reserved - note.reserved > 0 ? oldNote!.reserved - note.reserved : 0,
          })
        );
      });
    }
    setStepAhead(true);
  };

  const wholeDate: { hour: string; weekDay: string; day: string; month: string; year: string } = getArabicDate(
    new Date(props.date || "")
  );

  return (
    <div className={`flex flex--column reservation  ${Notedone.length === 0 ? " reservation--done" : ""}`}>
      <div className="reservation__title">
        <h4 className="heading--forth">{props.name}</h4>
        <p className="reservation__date">{`${wholeDate.hour} `}</p>
        <p className="reservation__date">{`${wholeDate.weekDay} ${wholeDate.day} ${wholeDate.month} `}</p>
      </div>

      <ul className="reservation__notes">
        {props.reservedNotes.map((note) => (
          <li key={note.id} className="reservation__note">
            <button
              className={`reservation__note-sign ${Notedone.includes(note.id) ? "reservation__note-sign--cross" : ""}`}
              onClick={markNoteDone.bind(null, note.id)}
            >
              {Notedone.includes(note.id) ? crossxmark : check}
            </button>
            <p className="reservation__note-text">
              {`${note.name} ${note.subStageText} ${note.teacher}`}
              <span className="reservation__note-number">{`${getArabicNumbers(note.reserved)}`}</span>
            </p>
          </li>
        ))}
      </ul>
      <div className="reservation__spans">
        {props.remaining > 0 && <span className="reservation__span">مدفوع: {getArabicNumbers(props.paid)} جنيه</span>}
        {props.remaining > 0 && <span className="reservation__span">باقي: {getArabicNumbers(props.remaining)} جنيه</span>}
        {props.remaining < 0 && <span className="reservation__span  reservation__span--done">خالص</span>}
        {props.notes && <span className="reservation__span">ملاحظات: {props.notes}</span>}
        {stepAhead && (
          <p className="reservation__span  reservation__span--check">
            فيه حاجات متعلمتش <span className="reservation__span--check-sign">{check}</span>
          </p>
        )}
      </div>
      <button className="btn--cta btn" onClick={removeReservationHandler}>
        {!stepAhead ? "إتسلم" : "😎😎مش مهم😎😎"}
      </button>
    </div>
  );
};

export default Reservation;
