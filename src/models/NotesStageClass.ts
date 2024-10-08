import { v4 } from "uuid";

export class NotesStage {
  id: string;
  constructor(public imgSrc: string, public title: string, public color: string, public path: string, public subStages: number[]) {
    this.id = v4();
  }
}
