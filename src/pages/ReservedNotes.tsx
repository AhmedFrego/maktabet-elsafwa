import React from "react";
import { useSelector } from "react-redux";
import { NoteClass } from "../models/NoteClass";
import { RootState } from "../store";
import ReservedNote from "../components/ReservedNote";
import TitledSection from "../components/layout/TitledSection";
import NoItems from "../components/UI/NoItems";

export const ReservedNotes = () => {
  const reservedNotes = useSelector((state: RootState) => state.reservation.reservedNotes) as NoteClass[];

  return (
    <TitledSection id="reserved-notes" passedClass="pricing" title="المذكرات المطلوبة">
      {reservedNotes.length === 0 && <NoItems text="🤕🤕خلصنا الشغل كلو الله ينور 💪💪" />}

      {reservedNotes.map((note) => (
        <ReservedNote key={note.id} note={note} />
      ))}
    </TitledSection>
  );
};

