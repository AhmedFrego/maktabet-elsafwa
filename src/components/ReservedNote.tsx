import React, { FC } from "react";
import { NoteClass } from "../models/NoteClass";

import { getArabicNumbers } from "../functions/getArabicNumbers";
import { Link } from "react-router-dom";

const ReservedNote: FC<{ note: NoteClass }> = ({ note }) => {
  return (
    <>
      {note.reserved > 0 && (
        <div className="reserved-note">
          <Link to={note.path} className="reserved-note__link">
            <span className="reserved-note__span"> {note.name} </span>
            <span className="reserved-note__span"> {note.subStageText} </span>
            <span className="reserved-note__span reserved-note__span--number"> {getArabicNumbers(note.reserved )} </span>
          </Link>
        </div>
      )}
    </>
  );
};

export default ReservedNote;
