import { getDatabase, ref, update, set } from "firebase/database";

import { NoteClass } from "../../models/NoteClass";

export function noteManager(note: NoteClass) {
  const db = getDatabase();
  update(ref(db), { ["/notes/" + note.id]: { ...note, id: null } });
}

export const removeNoteFromDB = (id: string) => {
  const db = getDatabase();
  set(ref(db, "notes/" + id), null);
};
