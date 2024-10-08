import { v4 } from "uuid";

export enum Stage {
  "PRIMARY",
  "JUNIOR",
  "SECONDARY",
  "KG",
  "COLLAGE",
}

export enum SubStage {
  "1pr",
  "2pr",
  "3pr",
  "4pr",
  "5pr",
  "6pr",
  "1ju",
  "2ju",
  "3ju",
  "1se",
  "2se",
  "3se",
  "KG1",
  "KG2",
  "collage",
}


export const SubStageText = [
  "أولى إبتدائي",
  "تانية إبتدائي",
  "تالتةإبتدائي",
  "رابعةإبتدائي",
  "خامسةإبتدائي",
  "سادسة إبتدائي",
  "أولى إعدادي",
  "تانية إعدادي",
  "تالتة إعدادي",
  "أولى ثانوي",
  "تانية ثانوي",
  "تالتة ثانوي",
  "أولى حضانة",
  "تانية حضانة",
  "جامعة",
];

export class NoteClass {
  id: string;
  constructor(
    public name: string,
    public teacher: string,
    public printed: number,
    public reserved: number,
    public cover: string,
    public stage: Stage,
    public subStage: SubStage,
    public subStageText: string,
    public year: number,
    public favorited: boolean = false,
    public price: number,
    public path: string
  ) {
    this.id = v4();
  }
}
