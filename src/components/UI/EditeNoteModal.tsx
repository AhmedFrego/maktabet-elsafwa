import React, { FC } from "react";
import { NoteClass } from "../../models/NoteClass";

import NewNote from "../../pages/NewNote";

const EditeNoteModal: FC<{ note: NoteClass }> = (props) => {
  return (
    <div className="flex flex--column u-margin-center ">
      <NewNote note={props.note} />
    </div>
  );
};

export default EditeNoteModal;
