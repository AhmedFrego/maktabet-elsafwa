import { NotesStage } from "../../models/NotesStageClass";

export const stages = [
  new NotesStage(
    require("../../assets/imgs/cute-cartoon-kids-set-children.png"),
    "المرحلة الابتدائية",
    "green",
    "primary",
    [1, 2, 3, 4, 5, 6]
  ),
  new NotesStage(require("../../assets/imgs/istockphoto-1018858866-612x612.jpg"), "المرحلة الاعدادية", "blue", "junior", [1, 2, 3]),
  new NotesStage(require("../../assets/imgs/istockphoto-1154609114-170667a.jpg"), "المرحلة الثانوية", "red", "secondary", [1, 2, 3]),
];
