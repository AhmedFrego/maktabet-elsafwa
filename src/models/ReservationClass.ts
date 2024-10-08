import { v4 } from "uuid";
import { NoteClass } from "./NoteClass";

export class ReservationClass {
  constructor(
    public name: string,
    public reservedNotes: NoteClass[],
    public paid: number,
    public remaining: number,
    public notesIds: string[],
    public notes: string,
    public date?: Date,
    public id?: string
  ) {
    this.date = date || new Date();
    this.id = id || v4();
  }
}
